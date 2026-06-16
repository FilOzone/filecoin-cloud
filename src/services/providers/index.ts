import {
  type GetContractReturnType,
  getContract,
  type PublicClient,
} from 'viem'

import type {
  EndorsementSetABI,
  ServiceRegistryABI,
  WarmStorageViewABI,
} from '@/config/abis'
import { getChain, type Network } from '@/config/chains'
import { getPublicClient } from '@/config/client'
import { providerSchema, type ServiceProvider } from '@/schemas/provider-schema'
import type { FetchProvidersOptions, ProviderFilter } from '@/types/providers'
import { getCheckActivityUrl } from '@/utils/provider-urls'

import { ENRICH_CONCURRENCY } from './constants'
import {
  fetchApprovedProviderIds,
  fetchEndorsedProviderIds,
  fetchProviderById,
  fetchProvidersBulk,
} from './contract'
import { fetchPingResult } from './ping'
import type { BaseProviderData, ProviderRuntimeInfo } from './types'
import { fetchSoftwareVersion } from './version'

/**
 * Fetch providers based on filter type
 */
async function fetchProvidersByFilter(
  filter: ProviderFilter,
  contracts: {
    storageView: GetContractReturnType<typeof WarmStorageViewABI, PublicClient>
    endorsementSet: GetContractReturnType<
      typeof EndorsementSetABI,
      PublicClient
    >
    serviceRegistry: GetContractReturnType<
      typeof ServiceRegistryABI,
      PublicClient
    >
  },
): Promise<BaseProviderData[]> {
  const { storageView, endorsementSet, serviceRegistry } = contracts

  // Fetch approved provider IDs for marking providers
  const approvedProviderIds = await fetchApprovedProviderIds(storageView)
  const approvedSet = new Set(approvedProviderIds)
  const endorsedProviderIds = await fetchEndorsedProviderIds(endorsementSet)
  const endorsedSet = new Set(endorsedProviderIds)

  // Use optimized bulk fetch for 'active' and 'all' filters
  if (filter === 'active' || filter === 'all') {
    const onlyActive = filter === 'active'
    return fetchProvidersBulk(
      serviceRegistry,
      onlyActive,
      approvedSet,
      endorsedSet,
    )
  }

  // For 'approved' filter, fetch individual providers from WarmStorageView
  if (filter === 'approved') {
    if (!approvedProviderIds || approvedProviderIds.length === 0) {
      return []
    }

    // Fetch details for each approved provider
    const providerPromises = approvedProviderIds.map(async (providerId) => {
      try {
        return await fetchProviderById(
          providerId,
          serviceRegistry,
          true,
          endorsedSet.has(providerId),
        )
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
      (provider): provider is BaseProviderData => provider !== null,
    )
  }

  throw new Error(`Invalid filter type: ${filter}`)
}

/**
 * Attach the locally-computed check-activity URL to base contract data and
 * validate it against the provider schema. Reachability and software version
 * are intentionally left undefined here — they are probed separately (either
 * progressively per row via `fetchProviderRuntime`, or in bulk via
 * `enrichProviders`).
 */
function toServiceProviders(
  providers: BaseProviderData[],
  network: Network,
): ServiceProvider[] {
  const valid: ServiceProvider[] = []
  for (const provider of providers) {
    const candidate = {
      ...provider,
      checkActivityUrl: getCheckActivityUrl(network, provider.payeeAddress),
    }
    const result = providerSchema.safeParse(candidate)
    if (result.success) {
      valid.push(result.data)
    } else {
      console.warn(
        `Skipping malformed provider ${provider.id} (${provider.name}):`,
        result.error.issues,
      )
    }
  }
  return valid
}

/**
 * Enrich providers with runtime information (software version + reachability).
 * Used by the warm-storage page, which renders only once the full list is
 * ready. The service-providers page instead loads this progressively per row
 * (see `fetchProviderRuntime`).
 */
async function enrichProviders(
  providers: ServiceProvider[],
): Promise<ServiceProvider[]> {
  const enriched: ServiceProvider[] = []

  // Process providers in batches of ENRICH_CONCURRENCY (each fires /version + /pdp/ping)
  for (let i = 0; i < providers.length; i += ENRICH_CONCURRENCY) {
    const batch = providers.slice(i, i + ENRICH_CONCURRENCY)
    const batchResults = await Promise.all(
      batch.map(async (provider) => {
        const { softwareVersion, reachable, latencyMs } =
          await fetchProviderRuntime(provider.serviceUrl)
        return { ...provider, softwareVersion, reachable, latencyMs }
      }),
    )
    enriched.push(...batchResults)
  }

  return enriched
}

/**
 * Probe a single provider's runtime endpoints (/version + /pdp/ping) in
 * parallel. Designed to be called once per provider so the service-providers
 * table can fill in each row independently as its probe resolves, isolating
 * the impact of any one node's network jitter to that row.
 *
 * @param serviceUrl - Provider service URL
 * @returns Software version, reachability, and ping latency
 */
export async function fetchProviderRuntime(
  serviceUrl?: string,
): Promise<ProviderRuntimeInfo> {
  const [softwareVersion, ping] = await Promise.all([
    fetchSoftwareVersion(serviceUrl),
    fetchPingResult(serviceUrl),
  ])

  return {
    softwareVersion,
    reachable: ping.reachable,
    latencyMs: ping.latencyMs,
  }
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

  // Connect to EndorsementSet contract
  const endorsementSetContract = getContract({
    address: chain.contractsWithAbi.endorsementSet.address,
    abi: chain.contractsWithAbi.endorsementSet.abi,
    client: publicClient,
  })

  return {
    warmStorage: warmStorageContract,
    storageView: storageViewContract,
    endorsementSet: endorsementSetContract,
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
  const baseProviders = await fetchBaseProviders(network, options)

  // Enrich with runtime information (software version + reachability)
  return enrichProviders(baseProviders)
}

/**
 * Fetch providers with only their on-chain (base) data, without probing the
 * /version or /pdp/ping endpoints. This returns quickly so the
 * service-providers table can render the full list immediately and then load
 * each row's runtime info progressively (see `fetchProviderRuntime`).
 *
 * @param network - Network to fetch from (default: 'calibration')
 * @param options - Filter options
 * @returns Array of service providers with base data and check-activity URL
 */
export async function fetchBaseProviders(
  network: Network = 'calibration',
  options?: FetchProvidersOptions,
): Promise<ServiceProvider[]> {
  const filter: ProviderFilter = options?.filter ?? 'approved'

  // Initialize contracts
  const { storageView, endorsementSet, serviceRegistry } =
    initializeContracts(network)

  // Fetch providers based on filter
  const fetchedProviders = await fetchProvidersByFilter(filter, {
    storageView,
    endorsementSet,
    serviceRegistry,
  })

  return toServiceProviders(fetchedProviders, network)
}
