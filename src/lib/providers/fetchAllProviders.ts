import type { ethers } from 'ethers'

import { fetchSingleProviderV031 } from './fetchProvider'

type FetchAllProvidersParams = {
  serviceRegistryContract: ethers.Contract
  providerIds: Array<bigint>
}

// Step 5: Fetch all providers in parallel
export async function fetchAllProviders({
  serviceRegistryContract,
  providerIds,
}: FetchAllProvidersParams) {
  console.log(`🚀 Fetching ${providerIds.length} providers in parallel...`)

  // Create promise for each provider
  const providerPromises = providerIds.map(async (providerId) => {
    try {
      return await fetchSingleProviderV031({
        serviceRegistryContract,
        providerId,
      })
    } catch (error) {
      console.error(`Failed to fetch provider ${providerId}:`, error)
      // Return null for failed providers - filter them out later
      return null
    }
  })

  // Wait for all promises to complete
  const results = await Promise.all(providerPromises)

  // Filter out nulls (failed fetches)
  const successfulProviders = results.filter((p) => p !== null)
  console.log(
    `✅ Successfully fetched ${successfulProviders.length}/${providerIds.length} providers`,
  )

  return successfulProviders
}
