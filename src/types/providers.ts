import type { Hex } from 'viem'

/**
 * PDP offering details (decoded from capability k/v pairs)
 */
export interface PDPOffering {
  serviceURL: string
  minPieceSizeInBytes: bigint
  maxPieceSizeInBytes: bigint
  ipniPiece: boolean
  ipniIpfs: boolean
  storagePricePerTibPerDay: bigint
  minProvingPeriodInEpochs: bigint
  location: string
  paymentTokenAddress: Hex

  // optional
  peerId?: string
  serviceStatus?: string
  capacityTib?: bigint
}

/**
 * Filter type for fetching providers
 * - 'approved': Only providers approved in the WarmStorage contract
 * - 'active': All providers with active PDP products (in serviceProviderRegistry)
 * - 'all': All registered providers (in serviceProviderRegistry)
 */
export type ProviderFilter = 'approved' | 'active' | 'all'

/**
 * Options for fetching providers
 */
export interface FetchProvidersOptions {
  filter?: ProviderFilter
}
