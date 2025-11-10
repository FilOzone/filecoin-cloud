import {
  type GetContractReturnType,
  getContract,
  type PublicClient,
} from 'viem'

import type { ServiceRegistryABI, WarmStorageViewABI } from '@/config/abis'
import { getChain, type Network } from '@/config/chains'
import { getPublicClient } from '@/config/client'
import {
  providersSchema,
  type ServiceProvider,
} from '@/schemas/provider-schema'
import type { FetchProvidersOptions, ProviderFilter } from '@/types/providers'

import { VERSION_FETCH_CONCURRENCY } from './constants'
import {
  fetchApprovedProviderIds,
  fetchProviderById,
  fetchProvidersBulk,
} from './contract'
import type { ProviderWithoutSoftwareVersion } from './types'
import { fetchSoftwareVersion } from './version'

/**
 * Fetch providers based on filter type
 */
async function fetchProvidersByFilter(
  filter: ProviderFilter,
  contracts: {
    storageView: GetContractReturnType<typeof WarmStorageViewABI, PublicClient>
    serviceRegistry: GetContractReturnType<
      typeof ServiceRegistryABI,
      PublicClient
    >
  },
): Promise<ProviderWithoutSoftwareVersion[]> {
  const { storageView, serviceRegistry } = contracts

  // Fetch approved provider IDs for marking providers
  const approvedProviderIds = await fetchApprovedProviderIds(storageView)
  const approvedSet = new Set(approvedProviderIds)

  // Use optimized bulk fetch for 'active' and 'all' filters
  if (filter === 'active' || filter === 'all') {
    const onlyActive = filter === 'active'
    return fetchProvidersBulk(serviceRegistry, onlyActive, approvedSet)
  }

  // For 'approved' filter, fetch individual providers from WarmStorageView
  if (filter === 'approved') {
    if (!approvedProviderIds || approvedProviderIds.length === 0) {
      return []
    }

    // Fetch details for each approved provider
    const providerPromises = approvedProviderIds.map(async (providerId) => {
      try {
        return await fetchProviderById(providerId, serviceRegistry, true)
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error'
        console.error(`Error fetching provider ${providerId}:`, {
          error,
          message: errorMessage,
        })
        return null
      }
    })

    const providers = await Promise.all(providerPromises)
    return providers.filter(
      (provider): provider is ProviderWithoutSoftwareVersion =>
        provider !== null,
    )
  }

  throw new Error(`Invalid filter type: ${filter}`)
}

/**
 * Enrich providers with software version information
 */
async function enrichProvidersWithVersions(
  providers: ProviderWithoutSoftwareVersion[],
): Promise<ServiceProvider[]> {
  const providersWithVersions: Array<
    ProviderWithoutSoftwareVersion & { softwareVersion?: string }
  > = []

  // Process providers in batches
  for (let i = 0; i < providers.length; i += VERSION_FETCH_CONCURRENCY) {
    const batch = providers.slice(i, i + VERSION_FETCH_CONCURRENCY)
    const batchResults = await Promise.all(
      batch.map(async (provider) => {
        const softwareVersion = await fetchSoftwareVersion(provider.serviceUrl)
        return { ...provider, softwareVersion }
      }),
    )
    providersWithVersions.push(...batchResults)
  }

  const result = providersSchema.safeParse(providersWithVersions)
  if (!result.success) {
    console.error('Provider validation failed:', {
      errors: result.error.issues,
      providers: providersWithVersions.map((p) => ({ id: p.id, name: p.name })),
    })
    throw new Error(`Provider validation failed: ${result.error.message}`)
  }
  return result.data
}

/**
 * Initialize contract instances for the given network
 */
function initializeContracts(network: Network) {
  const chain = getChain(network)
  const publicClient = getPublicClient(network)

  // Connect to WarmStorage contract
  const warmStorageContract = getContract({
    address: chain.contractsWithAbi.warmStorage.address,
    abi: chain.contractsWithAbi.warmStorage.abi,
    client: publicClient,
  })

  // Connect to WarmStorageView contract
  const storageViewContract = getContract({
    address: chain.contractsWithAbi.warmStorageView.address,
    abi: chain.contractsWithAbi.warmStorageView.abi,
    client: publicClient,
  })

  // Connect to ServiceRegistry contract
  const serviceRegistryContract = getContract({
    address: chain.contractsWithAbi.serviceRegistry.address,
    abi: chain.contractsWithAbi.serviceRegistry.abi,
    client: publicClient,
  })

  return {
    warmStorage: warmStorageContract,
    storageView: storageViewContract,
    serviceRegistry: serviceRegistryContract,
    publicClient,
  }
}

/**
 * Fetch providers from the specified network with optional filtering
 *
 * @param network - Network to fetch from (default: 'calibration')
 * @param options - Filter options
 * @returns Array of service providers with complete information
 *
 * @example
 * ```typescript
 * // Fetch all active providers
 * const providers = await fetchProviders('calibration', { filter: 'active' })
 *
 * // Fetch approved providers
 * const approved = await fetchProviders('mainnet', { filter: 'approved' })
 * ```
 */
export async function fetchProviders(
  network: Network = 'calibration',
  options?: FetchProvidersOptions,
): Promise<ServiceProvider[]> {
  const filter: ProviderFilter = options?.filter ?? 'approved'

  // Initialize contracts
  const { storageView, serviceRegistry } = initializeContracts(network)

  // Fetch providers based on filter
  const fetchedProviders = await fetchProvidersByFilter(filter, {
    storageView,
    serviceRegistry,
  })

  // Enrich with software versions
  return enrichProvidersWithVersions(fetchedProviders)
}
