import { zipObj } from 'ramda'
import type { Hex } from 'viem'

import type { ProviderData } from '@/types/contract-types'
import { decodePDPCapabilities } from '@/utils/decode-pdp-capabilities'
import { parseLocation } from '@/utils/parse-location'

import type { ProviderWithoutSoftwareVersion } from './types'

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

/**
 * Check if provider address is valid (not zero address)
 */
function isValidProviderAddress(address: string): boolean {
  return Boolean(address) && address !== ZERO_ADDRESS
}

/**
 * Build capabilities object from keys and values
 */
function buildCapabilities(
  capabilityKeys: readonly string[],
  capabilityValues: readonly Hex[],
): Record<string, Hex> {
  if (capabilityKeys.length === 0 || capabilityValues.length === 0) {
    return {}
  }

  return zipObj(Array.from(capabilityKeys), capabilityValues)
}

/**
 * Process raw provider data from contract into ServiceProvider format
 * Handles validation, capability decoding, and data transformation
 *
 * @param providerData - Raw provider data from contract
 * @param isApproved - Whether this provider is in the approved list (default: false)
 */
export function processProviderData(
  providerData: ProviderData,
  isApproved = false,
): ProviderWithoutSoftwareVersion | undefined {
  const { providerId, providerInfo, product, productCapabilityValues } =
    providerData

  // Filter out null providers (zero address)
  if (!isValidProviderAddress(providerInfo.serviceProvider)) {
    return undefined
  }

  const capabilityValuesBytes = productCapabilityValues ?? []
  const capabilityKeys = product.capabilityKeys ?? []
  const pdpIsActive = product.isActive
  const providerIsActive = providerInfo.isActive
  const finalIsActive = providerIsActive && pdpIsActive

  // Build and decode capabilities
  const capabilities = buildCapabilities(capabilityKeys, capabilityValuesBytes)
  const pdpOffering = decodePDPCapabilities(capabilities)

  return {
    id: Number(providerId),
    name: providerInfo.name || `Provider ${providerId}`,
    description:
      providerInfo.description || 'Storage provider on Filecoin network',
    serviceProviderAddress: providerInfo.serviceProvider,
    payeeAddress: providerInfo.payee,
    serviceUrl: pdpOffering.serviceURL,
    pricingPerTb: pdpOffering.storagePricePerTibPerDay,
    minPieceSize: pdpOffering.minPieceSizeInBytes,
    maxPieceSize: pdpOffering.maxPieceSizeInBytes,
    isActive: finalIsActive,
    isApproved,
    providerId: Number(providerId),
    location: parseLocation(pdpOffering.location),
    ipniPiece: pdpOffering.ipniPiece,
    ipniIpfs: pdpOffering.ipniIpfs,
    paymentTokenAddress: pdpOffering.paymentTokenAddress,
    capabilityKeys: Array.from(capabilityKeys),
    serviceStatus: pdpOffering.serviceStatus,
    capacityTb: pdpOffering.capacityTib,
    peerId: pdpOffering.peerId,
    minProvingPeriod: pdpOffering.minProvingPeriodInEpochs,
  }
}
