import type { Network } from '@/config/chains'

export const EXPLORERS = {
  BLOCKSCOUT: {
    mainnet: 'https://filecoin.blockscout.com/address/',
    calibration: 'https://filecoin-testnet.blockscout.com/address/',
  },
  PDP_SCAN: {
    mainnet: 'https://pdp.filecoin.cloud/mainnet/providers/',
    calibration: 'https://pdp.filecoin.cloud/calibration/providers/',
  },
} as const satisfies Record<string, Record<Network, string>>
