import bs58 from 'bs58'
import type { Address, Hex } from 'viem'
import { hexToString, pad, zeroAddress } from 'viem'

import type { PDPOffering } from '@/types/providers'

/**
 * Safely decode a capacity value from hex to BigInt
 * Returns undefined if the hex contains non-numeric text (e.g., "enter available storage")
 *
 * @param capacityHex - Hex-encoded capacity value
 * @returns BigInt capacity or undefined if invalid/non-numeric
 */
function decodeCapacity(capacityHex?: Hex): bigint | undefined {
  if (!capacityHex) return undefined

  try {
    // First decode the hex to string to check if it's a text value
    const decodedValue = hexToString(capacityHex)
    // If it's a non-numeric string (like "enter available storage"), return undefined
    if (Number.isNaN(Number(decodedValue))) {
      return undefined
    }
    // Otherwise, convert the original hex to BigInt
    return BigInt(capacityHex)
  } catch {
    return undefined
  }
}

/**
 * Decode PDP capabilities from keys/values arrays into a PDPOffering object.
 * Based on Curio's capabilitiesToOffering function.
 *
 * @throws {Error} If required capabilities are missing or invalid
 */
export function decodePDPCapabilities(
  capabilities: Record<string, Hex>,
): PDPOffering {
  try {
    // Validate required fields exist ( enforced by serviceProviderRegistry contract )
    const requiredFields = [
      'serviceURL',
      'minPieceSizeInBytes',
      'maxPieceSizeInBytes',
      'storagePricePerTibPerDay',
      'minProvingPeriodInEpochs',
      'location',
      'paymentTokenAddress',
    ]

    for (const field of requiredFields) {
      if (!(field in capabilities)) {
        throw new Error(`Missing required capability: ${field}`)
      }
    }

    return {
      serviceURL: hexToString(capabilities.serviceURL),
      minPieceSizeInBytes: BigInt(capabilities.minPieceSizeInBytes),
      maxPieceSizeInBytes: BigInt(capabilities.maxPieceSizeInBytes),
      ipniPiece: 'ipniPiece' in capabilities,
      ipniIpfs: 'ipniIpfs' in capabilities,
      storagePricePerTibPerDay: BigInt(capabilities.storagePricePerTibPerDay),
      minProvingPeriodInEpochs: BigInt(capabilities.minProvingPeriodInEpochs),
      location: hexToString(capabilities.location),
      paymentTokenAddress: decodeAddressCapability(
        capabilities.paymentTokenAddress,
      ),

      // Optional properties
      serviceStatus: capabilities.serviceStatus
        ? hexToString(capabilities.serviceStatus)
        : capabilities.service_status
          ? hexToString(capabilities.service_status)
          : undefined,
      capacityTib: decodeCapacity(capabilities.capacityTib),
      peerId: decodePeerId(capabilities.IPNIPeerID || capabilities.ipniPeerID),
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(
      `Failed to decode PDP capabilities: ${errorMessage}. Available keys: ${Object.keys(capabilities).join(', ')}`,
    )
  }
}

/**
 * Matches the behavior of `address(uint160(BigEndian.decode(values[i])))`
 */
export function decodeAddressCapability(capabilityValue: Hex): Address {
  if (capabilityValue.length > 66) {
    return zeroAddress
  }
  if (capabilityValue.length > 42) {
    return `0x${capabilityValue.slice(-40)}`
  }
  if (capabilityValue.length < 42) {
    return pad(capabilityValue, { size: 20 })
  }
  return capabilityValue
}

/**
 * Decodes a peer ID from bytes to a base58 string.
 * @param peerIdBytes - The peer ID bytes to decode.
 * @returns The decoded peer ID as a base58 string.
 */
export function decodePeerId(peerIdBytes: string) {
  if (!peerIdBytes) return ''

  try {
    let bytes: Uint8Array

    if (typeof peerIdBytes === 'string' && peerIdBytes.startsWith('0x')) {
      // Hex string format
      const hex = peerIdBytes.slice(2)
      bytes = new Uint8Array(
        hex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || [],
      )
    } else if (typeof peerIdBytes === 'string') {
      // Raw string format
      bytes = new Uint8Array(peerIdBytes.length)
      for (let i = 0; i < peerIdBytes.length; i++) {
        bytes[i] = peerIdBytes.charCodeAt(i)
      }
    } else {
      // Already in the right format or unknown
      return peerIdBytes
    }

    return bytes.length > 0 ? bs58.encode(bytes) : ''
  } catch (error) {
    console.error('Error decoding peer ID:', error)
    return ''
  }
}
