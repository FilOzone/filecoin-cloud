import { ethers } from 'ethers'

// Step 2: Query the Warm Storage contract to get the Service Provider Registry address
type GetRegistryAddressParams = {
  provider: ethers.Provider
  warmStorageProxyAddress: string
  warmStorageABI: Array<string>
}

export async function getRegistryAddress({
  provider,
  warmStorageProxyAddress,
  warmStorageABI,
}: GetRegistryAddressParams) {
  console.log('🔍 Querying Warm Storage contract for registry address...')

  // Create contract instance
  const warmStorageContract = new ethers.Contract(
    warmStorageProxyAddress,
    warmStorageABI,
    provider,
  )

  // Call the serviceProviderRegistry() function
  const registryAddress = await warmStorageContract.serviceProviderRegistry()
  console.log('📍 Service Provider Registry found at:', registryAddress)

  return registryAddress
}
