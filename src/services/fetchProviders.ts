import { SPRegistryService } from '@filoz/synapse-sdk/sp-registry'
import { ethers } from 'ethers'
import { zipObj } from 'ramda'
import { hexToString } from 'viem'

import { ServiceRegistryABI, StateViewABI, WarmStorageABI } from '@/config/abis'
import contracts from '@/config/contracts.json'
import { providersSchema, type ServiceProvider } from '@/schemas/providerSchema'
import type { ABIVersion } from '@/types/abiType'
import { decodePeerId } from '@/utils/decodePeerId'
import { isVersionV031OrAbove } from '@/utils/isVersionV031OrAbove'
import { parseBooleanCapability } from '@/utils/parseBooleanCapability'
import { parseLocation } from '@/utils/parseLocation'

const TESTNET_CONFIG = contracts.calibration
const BATCH_SIZE = 100
const VERSION_FETCH_TIMEOUT = 5_000
const PDP_PRODUCT_TYPE = 0
const DEFAULT_MIN_PIECE_SIZE = '256'
const DEFAULT_MAX_PIECE_SIZE = '34359738368'
const DEFAULT_PRICING = '0'

/**
 * Fetch approved provider IDs using appropriate ABI version
 */
async function fetchApprovedProviderIds(
  stateViewContract: ethers.Contract,
  useNewDecoding: boolean,
): Promise<bigint[]> {
  if (useNewDecoding) {
    // v0.3.1+: Use pagination
    const totalCount = await stateViewContract.getApprovedProvidersLength()

    if (Number(totalCount) === 0) {
      return []
    }

    let approvedProviderIds: bigint[] = []
    let offset = 0

    while (offset < Number(totalCount)) {
      const batch = await stateViewContract.getApprovedProviders(
        offset,
        BATCH_SIZE,
      )
      approvedProviderIds = approvedProviderIds.concat(batch)
      offset += BATCH_SIZE
    }

    return approvedProviderIds
  } else {
    // Pre-v0.3.1: No pagination
    return await stateViewContract.getApprovedProviders()
  }
}

/**
 * Fetch provider details for v0.3.1+ using new ABI
 */
async function fetchProviderV031(
  providerId: bigint,
  serviceRegistryContract: ethers.Contract,
) {
  const providerData = await serviceRegistryContract.getProviderWithProduct(
    providerId,
    PDP_PRODUCT_TYPE,
  )

  const providerInfo = providerData.providerInfo
  const product = providerData.product
  const capabilityValuesBytes = providerData.productCapabilityValues || []
  const capabilityKeys = product.capabilityKeys || []
  const pdpIsActive = product.isActive

  // Build capabilities objects
  let capabilities: Record<string, string> = {}
  const rawCapabilityBytes: Record<string, string> = {}

  if (capabilityKeys.length > 0 && capabilityValuesBytes.length > 0) {
    try {
      for (let i = 0; i < capabilityKeys.length; i++) {
        rawCapabilityBytes[capabilityKeys[i]] = capabilityValuesBytes[i]
      }

      const capabilityValuesStrings = capabilityValuesBytes.map(hexToString)
      capabilities = zipObj(capabilityKeys, capabilityValuesStrings)
    } catch (error) {
      console.error(
        `Provider ${providerId}: Error decoding capabilities:`,
        error,
      )
    }
  }

  // Extract capability values with fallbacks
  const serviceStatus =
    capabilities.serviceStatus || capabilities.service_status || ''
  const serviceUrl = capabilities.serviceURL || ''
  const location = capabilities.location || ''
  const minPieceSize =
    capabilities.minPieceSizeInBytes || DEFAULT_MIN_PIECE_SIZE
  const maxPieceSize =
    capabilities.maxPieceSizeInBytes || DEFAULT_MAX_PIECE_SIZE
  const storagePricePerTibPerMonth =
    capabilities.storagePricePerTibPerMonth || DEFAULT_PRICING

  // Decode Peer ID
  const peerIdRawBytes =
    rawCapabilityBytes.IPNIPeerID || rawCapabilityBytes.ipni_peer_id
  const peerId = decodePeerId(peerIdRawBytes)

  // Parse boolean capabilities
  const ipniPiece = parseBooleanCapability(capabilities.ipniPiece)
  const ipniIpfs = parseBooleanCapability(capabilities.ipniIpfs)

  const paymentTokenAddress = capabilities.paymentTokenAddress || ''
  const finalIsActive = providerInfo.isActive && pdpIsActive

  return {
    id: Number(providerId),
    name: providerInfo.name || `Provider ${providerId}`,
    description:
      providerInfo.description || 'Storage provider on Filecoin network',
    serviceProviderAddress: providerInfo.serviceProvider || '',
    payeeAddress: providerInfo.payee || '',
    serviceUrl: serviceUrl,
    pricingPerTb: storagePricePerTibPerMonth
      ? ethers.formatUnits(storagePricePerTibPerMonth, 18)
      : DEFAULT_PRICING,
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
}

/**
 * Fetch provider details for pre-v0.3.1 using legacy SDK
 */
async function fetchProviderLegacy(
  providerId: bigint,
  registry: SPRegistryService,
) {
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
  const peerId = decodePeerId(capabilities.IPNIPeerID)

  const finalLocation = capabilities.location || pdpData?.location || ''

  return {
    id: Number(providerId),
    name: providerInfo.name || `Provider ${providerId}`,
    description:
      providerInfo.description || 'Storage provider on Filecoin network',
    serviceProviderAddress: providerInfo.serviceProvider || '',
    payeeAddress: providerInfo.payee || '',
    serviceUrl: pdpData?.serviceURL || '',
    pricingPerTb: pdpData?.storagePricePerTibPerMonth
      ? ethers.formatUnits(pdpData.storagePricePerTibPerMonth, 18)
      : DEFAULT_PRICING,
    minPieceSize:
      pdpData?.minPieceSizeInBytes?.toString() || DEFAULT_MIN_PIECE_SIZE,
    maxPieceSize:
      pdpData?.maxPieceSizeInBytes?.toString() || DEFAULT_MAX_PIECE_SIZE,
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
}

/**
 * Fetch software version from provider's /version endpoint
 */
async function fetchSoftwareVersion(serviceUrl?: string) {
  if (!serviceUrl) {
    return
  }

  try {
    const baseUrl = serviceUrl.replace(/\/$/, '')
    const controller = new AbortController()
    const timeoutId = setTimeout(
      () => controller.abort(),
      VERSION_FETCH_TIMEOUT,
    )

    const response = await fetch(`${baseUrl}/version`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      mode: 'cors',
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      return
    }

    const responseText = await response.text()
    let version: string

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

    // Validate version format
    const versionPattern =
      /^\d+\.\d+\.\d+\+\w+\+git_[a-f0-9]+_\d{4}-\d{2}-\d{2}T[\d:+-]+$/

    return versionPattern.test(version) ? version : undefined
  } catch {
    return undefined
  }
}

/**
 * Fetch all providers from the calibration network
 */
export async function fetchAllProviders() {
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

  // Determine ABI version
  const useNewDecoding = isVersionV031OrAbove(currentVersion.version)
  const abiVersion: ABIVersion = useNewDecoding ? 'current' : 'legacy'

  // Connect to contracts
  const warmStorageContract = new ethers.Contract(
    currentVersion.contracts.warmStorage.proxy,
    WarmStorageABI[abiVersion],
    provider,
  )

  const registryAddress = await warmStorageContract.serviceProviderRegistry()

  const stateViewContract = new ethers.Contract(
    currentVersion.contracts.warmStorage.stateView,
    StateViewABI[abiVersion],
    provider,
  )

  // Get approved provider IDs
  const approvedProviderIds = await fetchApprovedProviderIds(
    stateViewContract,
    useNewDecoding,
  )

  if (!approvedProviderIds || approvedProviderIds.length === 0) {
    return []
  }

  // Initialize appropriate service for fetching provider details
  const registry = new SPRegistryService(provider, registryAddress)
  const serviceRegistryContract = new ethers.Contract(
    registryAddress,
    ServiceRegistryABI,
    provider,
  )

  // Fetch details for each approved provider
  const providerPromises = approvedProviderIds.map(
    async (providerId: bigint) => {
      try {
        if (useNewDecoding) {
          return await fetchProviderV031(providerId, serviceRegistryContract)
        } else {
          return await fetchProviderLegacy(providerId, registry)
        }
      } catch (error: any) {
        console.error(`Error fetching provider ${providerId}:`, {
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
  ) as Array<Omit<ServiceProvider, 'softwareVersion'>>

  // Fetch software versions for each provider
  const providersWithVersions = await Promise.all(
    fetchedProviders.map(async (provider) => {
      const softwareVersion = await fetchSoftwareVersion(provider.serviceUrl)
      return { ...provider, softwareVersion }
    }),
  )

  return providersSchema.parse(providersWithVersions)
}
