import { SPRegistryService } from '@filoz/synapse-sdk/sp-registry'
import { ethers } from 'ethers'

import {
  SERVICE_REGISTRY_ABI,
  WARM_STORAGE_ABI,
  WARM_STORAGE_ABI_LEGACY,
  WARM_STORAGE_STATE_VIEW_ABI,
  WARM_STORAGE_STATE_VIEW_ABI_LEGACY,
} from '../config/abis'
import contracts from '../config/contracts.json'
import { bytesToBase58 } from '../utils/bytesToBase58'
import { bytesToString } from '../utils/bytesToString'
import { capabilitiesListToObject } from '../utils/capabilitiesListToObject'
import { isVersionV031OrAbove } from '../utils/isVersionV031OrAbove'
import { parseLocation } from '../utils/parseLocation'

// Type definitions
export interface ServiceProvider {
  id: number
  serviceProviderAddress: string
  name: string
  description: string
  serviceUrl: string
  pricingPerTb: string
  minPieceSize: string
  maxPieceSize: string
  isActive: boolean
  payeeAddress: string
  providerId: number
  location: string
  ipniPiece: boolean
  ipniIpfs: boolean
  paymentTokenAddress: string
  capabilityKeys: string[]
  softwareVersion?: string
  serviceStatus?: string
  peerId?: string
}

/**
 * Fetches all service providers from the Calibration network
 * Uses the first active version from contracts.json
 * @returns Array of ServiceProvider objects
 * @throws Error if unable to fetch providers
 */

const TESTNET_CONFIG = contracts.calibration

export async function fetchAllProviders(): Promise<Array<ServiceProvider>> {
  // Get calibration network config
  // const calibrationConfig: any = (contracts as any).calibration
  if (!TESTNET_CONFIG) {
    throw new Error('Calibration network not found in contracts.json')
  }

  // Find first active version or default to index 0
  const activeVersionIndex = TESTNET_CONFIG.versions.findIndex(
    (v: any) => v.status === 'active',
  )
  const versionIndex = activeVersionIndex !== -1 ? activeVersionIndex : 0
  const currentVersion = TESTNET_CONFIG.versions[versionIndex]

  if (!currentVersion) {
    throw new Error('No version found for calibration network')
  }

  const rpcUrl = TESTNET_CONFIG.rpcUrl
  const provider = new ethers.JsonRpcProvider(rpcUrl)

  // Determine if using new ABI for v0.3.1+
  const useNewDecoding = isVersionV031OrAbove(currentVersion.version)

  // Connect to warm storage contract
  const warmStorageContract = new ethers.Contract(
    currentVersion.contracts.warmStorage.proxy,
    useNewDecoding ? WARM_STORAGE_ABI : WARM_STORAGE_ABI_LEGACY,
    provider,
  )

  // Get the ServiceProviderRegistry address
  const registryAddress = await warmStorageContract.serviceProviderRegistry()

  // Connect to State View contract
  const stateViewContract = new ethers.Contract(
    currentVersion.contracts.warmStorage.stateView,
    useNewDecoding
      ? WARM_STORAGE_STATE_VIEW_ABI
      : WARM_STORAGE_STATE_VIEW_ABI_LEGACY,
    provider,
  )

  // Get approved provider IDs
  let approvedProviderIds: bigint[] = []

  if (useNewDecoding) {
    // v0.3.1+: Use pagination
    const totalCount = await stateViewContract.getApprovedProvidersLength()

    if (Number(totalCount) === 0) {
      return []
    }

    // Fetch all providers in batches
    const batchSize = 100
    let offset = 0

    while (offset < Number(totalCount)) {
      const batch = await stateViewContract.getApprovedProviders(
        offset,
        batchSize,
      )
      approvedProviderIds = approvedProviderIds.concat(batch)
      offset += batchSize
    }
  } else {
    // v0.1.0: No pagination
    approvedProviderIds = await stateViewContract.getApprovedProviders()
  }

  if (!approvedProviderIds || approvedProviderIds.length === 0) {
    return []
  }

  // Initialize SPRegistryService from SDK (for older versions)
  const registry = new SPRegistryService(provider, registryAddress)

  // Create contract instance for v0.3.1+ approach
  const serviceRegistryContract = new ethers.Contract(
    registryAddress,
    SERVICE_REGISTRY_ABI,
    provider,
  )

  // Fetch details for each approved provider
  const providerPromises = approvedProviderIds.map(
    async (providerId: bigint) => {
      try {
        if (useNewDecoding) {
          // New approach for v0.3.1+
          const providerData =
            await serviceRegistryContract.getProviderWithProduct(
              providerId,
              0, // PDP product type
            )

          const providerInfo = providerData.providerInfo
          const product = providerData.product
          const capabilityValuesBytes =
            providerData.productCapabilityValues || []

          const capabilityKeys = product.capabilityKeys || []
          const pdpIsActive = product.isActive

          let capabilities: Record<string, string> = {}
          const rawCapabilityBytes: Record<string, string> = {}

          if (capabilityKeys.length > 0 && capabilityValuesBytes.length > 0) {
            try {
              for (let i = 0; i < capabilityKeys.length; i++) {
                rawCapabilityBytes[capabilityKeys[i]] = capabilityValuesBytes[i]
              }

              const capabilityValuesStrings = capabilityValuesBytes.map(
                (bytes: string) => bytesToString(bytes),
              )
              capabilities = capabilitiesListToObject(
                capabilityKeys,
                capabilityValuesStrings,
              )
            } catch (error) {
              console.error(
                `Provider ${providerId}: Error decoding capabilities:`,
                error,
              )
            }
          }

          const serviceStatus =
            capabilities.serviceStatus || capabilities.service_status || ''
          const serviceUrl = capabilities.serviceURL || ''
          const location = capabilities.location || ''
          const minPieceSize = capabilities.minPieceSizeInBytes || '256'
          const maxPieceSize = capabilities.maxPieceSizeInBytes || '34359738368'
          const storagePricePerTibPerMonth =
            capabilities.storagePricePerTibPerMonth || '0'

          // Decode Peer ID
          let peerId = ''
          const peerIdRawBytes =
            rawCapabilityBytes.IPNIPeerID || rawCapabilityBytes.ipni_peer_id
          if (peerIdRawBytes) {
            try {
              let bytes: Uint8Array

              if (
                typeof peerIdRawBytes === 'string' &&
                peerIdRawBytes.startsWith('0x')
              ) {
                const hex = peerIdRawBytes.slice(2)
                bytes = new Uint8Array(
                  hex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || [],
                )
              } else if (typeof peerIdRawBytes === 'string') {
                bytes = new Uint8Array(peerIdRawBytes.length)
                for (let i = 0; i < peerIdRawBytes.length; i++) {
                  bytes[i] = peerIdRawBytes.charCodeAt(i)
                }
              } else {
                bytes = new Uint8Array(0)
              }

              if (bytes.length > 0) {
                peerId = bytesToBase58(bytes)
              }
            } catch (error) {
              console.error(
                `Provider ${providerId}: Error decoding IPNIPeerID:`,
                error,
              )
            }
          }

          const ipniPiece =
            capabilities.ipniPiece === 'true' ||
            capabilities.ipniPiece === '\u0001' ||
            capabilities.ipniPiece?.charCodeAt(0) === 1
          const ipniIpfs =
            capabilities.ipniIpfs === 'true' ||
            capabilities.ipniIpfs === '\u0001' ||
            capabilities.ipniIpfs?.charCodeAt(0) === 1
          const paymentTokenAddress = capabilities.paymentTokenAddress || ''

          const finalIsActive = providerInfo.isActive && pdpIsActive

          const formattedProvider = {
            id: Number(providerId),
            name: providerInfo.name || `Provider ${providerId}`,
            description:
              providerInfo.description ||
              'Storage provider on Filecoin network',
            serviceProviderAddress: providerInfo.serviceProvider || '',
            payeeAddress: providerInfo.payee || '',
            serviceUrl: serviceUrl,
            pricingPerTb: storagePricePerTibPerMonth
              ? ethers.formatUnits(storagePricePerTibPerMonth, 18)
              : '0',
            minPieceSize: minPieceSize,
            maxPieceSize: maxPieceSize,
            isActive: finalIsActive,
            providerId: Number(providerId),
            location: parseLocation(location),
            ipniPiece: ipniPiece,
            ipniIpfs: ipniIpfs,
            paymentTokenAddress: paymentTokenAddress,
            capabilityKeys: capabilityKeys,
            serviceStatus: serviceStatus || undefined,
            peerId: peerId || undefined,
          }

          return formattedProvider
        } else {
          // Old approach for versions before v0.3.1
          const providerInfo = await registry.getProvider(Number(providerId))

          if (!providerInfo) {
            return null
          }

          const pdpProduct = providerInfo.products?.PDP
          const pdpData = pdpProduct?.data
          const capabilities = pdpProduct?.capabilities || {}
          const pdpIsActive = pdpProduct?.isActive || false

          const serviceStatus = capabilities.service_status || ''

          // Decode Peer ID
          let peerId = ''
          if (capabilities.IPNIPeerID) {
            try {
              const peerIdBytes = capabilities.IPNIPeerID
              let bytes: Uint8Array

              if (
                typeof peerIdBytes === 'string' &&
                peerIdBytes.startsWith('0x')
              ) {
                const hex = peerIdBytes.slice(2)
                bytes = new Uint8Array(
                  hex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || [],
                )
              } else if (typeof peerIdBytes === 'string') {
                bytes = new Uint8Array(peerIdBytes.length)
                for (let i = 0; i < peerIdBytes.length; i++) {
                  bytes[i] = peerIdBytes.charCodeAt(i)
                }
              } else {
                peerId = peerIdBytes
                bytes = new Uint8Array(0)
              }

              if (bytes.length > 0) {
                peerId = bytesToBase58(bytes)
              }
            } catch (error) {
              console.error(
                `Provider ${providerId}: Error decoding IPNIPeerID:`,
                error,
              )
            }
          }

          const finalLocation = capabilities.location || pdpData?.location || ''

          const formattedProvider = {
            id: Number(providerId),
            name: providerInfo.name || `Provider ${providerId}`,
            description:
              providerInfo.description ||
              'Storage provider on Filecoin network',
            serviceProviderAddress: providerInfo.serviceProvider || '',
            payeeAddress: providerInfo.payee || '',
            serviceUrl: pdpData?.serviceURL || '',
            pricingPerTb: pdpData?.storagePricePerTibPerMonth
              ? ethers.formatUnits(pdpData.storagePricePerTibPerMonth, 18)
              : '0',
            minPieceSize: pdpData?.minPieceSizeInBytes?.toString() || '256',
            maxPieceSize:
              pdpData?.maxPieceSizeInBytes?.toString() || '34359738368',
            isActive: providerInfo.active && pdpIsActive,
            providerId: Number(providerId),
            location: parseLocation(finalLocation),
            ipniPiece: pdpData?.ipniPiece || false,
            ipniIpfs: pdpData?.ipniIpfs || false,
            paymentTokenAddress: pdpData?.paymentTokenAddress || '',
            capabilityKeys: Object.keys(capabilities),
            serviceStatus: serviceStatus || undefined,
            peerId: peerId || undefined,
          }

          return formattedProvider
        }
      } catch (error: any) {
        console.error(`❌ Error fetching provider ${providerId}:`, {
          error: error,
          message: error?.message,
          code: error?.code,
          data: error?.data,
        })
        return null
      }
    },
  )

  const fetchedProviders = (await Promise.all(providerPromises)).filter(
    (p) => p !== null,
  ) as ServiceProvider[]

  // Fetch software versions for each provider
  const providersWithVersions = await Promise.all(
    fetchedProviders.map(async (provider) => {
      if (!provider.serviceUrl) {
        return provider
      }

      try {
        const baseUrl = provider.serviceUrl.replace(/\/$/, '')

        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)

        const response = await fetch(`${baseUrl}/version`, {
          method: 'GET',
          headers: { Accept: 'application/json' },
          mode: 'cors',
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        if (response.ok) {
          const responseText = await response.text()
          let version = 'unknown'

          try {
            const versionData = JSON.parse(responseText)
            version =
              versionData.version ||
              versionData.Version ||
              versionData.v ||
              responseText.trim()
          } catch {
            version = responseText.trim()
          }

          const versionPattern =
            /^\d+\.\d+\.\d+\+\w+\+git_[a-f0-9]+_\d{4}-\d{2}-\d{2}T[\d:+-]+$/
          if (versionPattern.test(version)) {
            return { ...provider, softwareVersion: version }
          }
        }
      } catch {
        // Failed to fetch - this is expected for many providers
      }

      return { ...provider, softwareVersion: 'unknown' }
    }),
  )

  return providersWithVersions
}
