import { useNetwork } from '@filecoin-foundation/ui-filecoin/Network/useNetwork'
import { CompactAddress as SharedCompactAddress } from '@filecoin-foundation/ui-filecoin/Table/CompactAddress'
import type { Address } from 'viem'

import { EXPLORERS } from '@/constants/external-services'
import { getNetworkId } from '@/utils/get-network-id'

type CompactAddressProps = {
  address: Address
}

export function CompactAddress({ address }: CompactAddressProps) {
  const [network] = useNetwork()
  const networkId = getNetworkId(network)

  return (
    <SharedCompactAddress
      address={address}
      explorerUrl={EXPLORERS.BLOCKSCOUT[networkId]}
    />
  )
}
