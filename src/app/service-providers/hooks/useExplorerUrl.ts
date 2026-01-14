import { useNetwork } from '@filecoin-foundation/ui-filecoin/Network/useNetwork'

import { EXPLORERS } from '@/constants/external-services'
import { getNetworkId } from '@/utils/get-network-id'

export function useExplorerUrl() {
  const [network] = useNetwork()
  const networkId = getNetworkId(network)
  const explorerUrl = EXPLORERS.BLOCKSCOUT[networkId]

  return {
    explorerUrl,
    networkId,
  } as const
}
