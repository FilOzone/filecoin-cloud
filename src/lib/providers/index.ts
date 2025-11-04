import { ethers } from 'ethers'

import { connectToBlockchain } from './connectToBlockchain'
import { fetchAllProviders } from './fetchAllProviders'
import { fetchProviderSoftwareVersion } from './fetchProviderSoftwareVersion'
import { getApprovedProviderIds } from './getApprovedProviders'
import { getRegistryAddress } from './getRegistryAddress'
import {
  SERVICE_REGISTRY_ABI,
  WARM_STORAGE_ABI,
  WARM_STORAGE_STATE_VIEW_ABI_LEGACY,
} from '../../config/abis'
import contracts from '../../config/contracts.json'

const TESTNET_CONFIG = contracts.calibration
const VERSION_ONE = TESTNET_CONFIG.versions[0]

const config = {
  rpcUrl: TESTNET_CONFIG.rpcUrl,
  warmStorageProxy: VERSION_ONE.contracts.warmStorage.proxy,
  stateView: VERSION_ONE.contracts.warmStorage.stateView,
}

export async function getWarmStorageProviders() {
  try {
    const provider = await connectToBlockchain({ rpcUrl: config.rpcUrl })

    const registryAddress = await getRegistryAddress({
      provider,
      warmStorageProxyAddress: config.warmStorageProxy,
      warmStorageABI: WARM_STORAGE_ABI,
    })

    const providerIds = await getApprovedProviderIds({
      provider,
      stateViewAddress: config.stateView,
      stateViewABI: WARM_STORAGE_STATE_VIEW_ABI_LEGACY,
      useNewDecoding: false, // using legacy (v0.1.0) method
    })

    if (providerIds.length === 0) {
      console.log('ℹ️ No providers found')
      return []
    }

    // Step 4 & 5: Fetch all provider details
    const serviceRegistryContract = new ethers.Contract(
      registryAddress,
      SERVICE_REGISTRY_ABI,
      provider,
    )

    const providersData = await fetchAllProviders({
      serviceRegistryContract,
      providerIds,
    })

    // Step 6: Fetch software versions (optional)
    console.log('🔄 Fetching software versions...')
    const providersWithVersions = await Promise.all(
      providersData.map(async (providerData) => {
        const serviceUrl = providerData.product.capabilityKeys.includes(
          'serviceURL',
        )
          ? providerData.productCapabilityValues[
              providerData.product.capabilityKeys.indexOf('serviceURL')
            ]
          : ''

        const version = await fetchProviderSoftwareVersion(serviceUrl)

        return {
          ...providerData,
          softwareVersion: version,
        }
      }),
    )

    console.log('🎉 Complete! Fetched all provider data')
    return providersWithVersions
  } catch (error) {
    console.error('❌ Workflow failed:', error)
    throw error
  }
}
