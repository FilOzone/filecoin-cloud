import type { ethers } from 'ethers'

type FetchSingleProviderParams = {
  serviceRegistryContract: ethers.Contract
  providerId: bigint
}

// TODO, add zod validation here
// Step 4: Fetch detailed information for a single provider (v0.3.1+ method)
export async function fetchSingleProviderV031({
  serviceRegistryContract,
  providerId,
}: FetchSingleProviderParams) {
  console.log(`🔎 Fetching details for provider ${providerId}...`)

  try {
    // Call getProviderWithProduct - this returns provider info + product capabilities in one call
    const providerData = await serviceRegistryContract.getProviderWithProduct(
      providerId,
      0, // Product type: 0 = PDP (Proof of Data Possession)
    )

    console.log(`Provider ${providerId} data retrieved`)

    return providerData
  } catch (error) {
    console.error(`Failed to fetch provider ${providerId}:`, error)
    throw error
  }
}
