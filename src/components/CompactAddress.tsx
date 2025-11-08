import { ExternalTextLink } from '@filecoin-foundation/filecoin-ui/TextLink/ExternalTextLink'
import type { Address } from 'viem'

import { EXPLORERS } from '@/constants/externalServices'
import { truncateAddress } from '@/utils/truncateAddress'

import { useNetwork } from './NetworkContext'

export type CompactAddressProps = {
  address: Address
}

export function CompactAddress({ address }: CompactAddressProps) {
  const { network } = useNetwork()
  const explorerUrl = EXPLORERS.BLOCKSCOUT[network]

  return (
    <ExternalTextLink
      href={`${explorerUrl}${address}`}
      aria-label={`View address ${address} on Block Explorer`}
      title={address}
      className="whitespace-nowrap"
    >
      <span className="font-medium">{truncateAddress(address)}</span>
    </ExternalTextLink>
  )
}
