import type { ChainId } from '@filecoin-foundation/ui-filecoin/Network/types'

import type { Network } from '@/config/chains'

export function getNetworkId(chainId: ChainId): Network {
  switch (chainId) {
    case 314:
      return 'mainnet'
    case 314_159:
      return 'calibration'
    default:
      throw new Error(`Network with chain id ${chainId} not found`)
  }
}
