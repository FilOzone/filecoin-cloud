import { CompactAddress as SharedCompactAddress } from '@filecoin-foundation/ui-filecoin/Table/CompactAddress'
import type { Address } from 'viem'

import { EXPLORERS } from '@/constants/external-services'

import { useNetwork } from './NetworkContext'

type CompactAddressProps = {
  address: Address
}

export function CompactAddress({ address }: CompactAddressProps) {
  const { network } = useNetwork()
  const explorerUrl = EXPLORERS.BLOCKSCOUT[network]

  return <SharedCompactAddress address={address} explorerUrl={explorerUrl} />
}
