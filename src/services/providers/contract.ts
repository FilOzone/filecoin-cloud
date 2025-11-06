import type { GetContractReturnType, PublicClient } from 'viem'

import type { ServiceRegistryABI, WarmStorageViewABI } from '@/config/abis'

import { BATCH_SIZE, PDP_PRODUCT_TYPE, PROVIDER_FETCH_LIMIT } from './constants'
import { processProviderData } from './processor'
import type { ProviderWithoutSoftwareVersion } from './types'

/**
 * Fetch approved provider IDs from WarmStorageView contract with pagination
 */
export async function fetchApprovedProviderIds(
  storageViewContract: GetContractReturnType<
    typeof WarmStorageViewABI,
    PublicClient
  >,
): Promise<bigint[]> {
  const totalCount = await storageViewContract.read.getApprovedProvidersLength()

  if (Number(totalCount) === 0) {
    return []
  }

  let approvedProviderIds: bigint[] = []
  let offset = 0

  while (offset < Number(totalCount)) {
    const batch = await storageViewContract.read.getApprovedProviders([
      BigInt(offset),
      BigInt(BATCH_SIZE),
    ])
    approvedProviderIds = approvedProviderIds.concat(batch)
    offset += BATCH_SIZE
  }

  return approvedProviderIds
}

/**
 * Fetch providers in bulk using getProvidersByProductType
 *
 * @param serviceRegistryContract - Service registry contract instance
 * @param onlyActive - Whether to fetch only active providers
 * @param approvedProviderIds - Optional set of approved provider IDs for marking providers
 */
export async function fetchProvidersBulk(
  serviceRegistryContract: GetContractReturnType<
    typeof ServiceRegistryABI,
    PublicClient
  >,
  onlyActive: boolean,
  approvedProviderIds?: Set<bigint>,
): Promise<ProviderWithoutSoftwareVersion[]> {
  const providers: ProviderWithoutSoftwareVersion[] = []
  let offset = 0
  let hasMore = true

  while (hasMore) {
    try {
      const result =
        await serviceRegistryContract.read.getProvidersByProductType([
          PDP_PRODUCT_TYPE,
          onlyActive,
          BigInt(offset),
          BigInt(PROVIDER_FETCH_LIMIT),
        ])

      const { providers: providerDataArray, hasMore: more } = result
      hasMore = more

      const errors: Array<{ providerId: bigint; error: Error }> = []

      for (const providerData of providerDataArray) {
        try {
          const isApproved = approvedProviderIds
            ? approvedProviderIds.has(providerData.providerId)
            : false
          const processed = processProviderData(providerData, isApproved)
          if (processed) {
            providers.push(processed)
          }
        } catch (error) {
          const err = error instanceof Error ? error : new Error(String(error))
          errors.push({ providerId: providerData.providerId, error: err })
          console.error(
            `Error processing provider ${providerData.providerId}:`,
            err,
          )
        }
      }

      if (errors.length > 0) {
        console.warn(`Failed to process ${errors.length} providers`, errors)
      }

      offset += PROVIDER_FETCH_LIMIT
    } catch (error) {
      console.error('Error fetching providers bulk:', error)
      break
    }
  }

  return providers
}

/**
 * Fetch individual provider details by ID
 *
 * @param providerId - Provider ID to fetch
 * @param serviceRegistryContract - Service registry contract instance
 * @param isApproved - Whether this provider is approved (default: false)
 */
export async function fetchProviderById(
  providerId: bigint,
  serviceRegistryContract: GetContractReturnType<
    typeof ServiceRegistryABI,
    PublicClient
  >,
  isApproved = false,
): Promise<ProviderWithoutSoftwareVersion | undefined> {
  const providerData =
    await serviceRegistryContract.read.getProviderWithProduct([
      providerId,
      PDP_PRODUCT_TYPE,
    ])

  if (!providerData) return undefined

  return processProviderData(providerData, isApproved)
}
