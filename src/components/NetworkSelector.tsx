import { supportedChainIds } from '@filecoin-foundation/ui-filecoin/Network/config'
import { NetworkSelector as SharedNetworkSelector } from '@filecoin-foundation/ui-filecoin/Network/NetworkSelector'

const options = supportedChainIds.map((id) => {
  const isMainnet = id === 314
  return {
    id,
    label: isMainnet ? 'Mainnet (Coming soon)' : 'Calibration',
    disabled: isMainnet,
  }
})

export function NetworkSelector() {
  return <SharedNetworkSelector options={options} />
}
