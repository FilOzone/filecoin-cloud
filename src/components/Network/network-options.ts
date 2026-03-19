import { supportedChainIds } from '@filecoin-foundation/ui-filecoin/Network/config'

export const networkOptions = [...supportedChainIds]
  .sort((a, b) => (a === b ? 0 : a === 314 ? -1 : b === 314 ? 1 : 0))
  .map((id) => ({
    id,
    label: id === 314 ? 'Mainnet' : 'Calibration',
  }))
