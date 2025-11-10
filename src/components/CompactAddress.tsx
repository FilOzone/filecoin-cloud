import { ExternalTextLink } from '@filecoin-foundation/ui-filecoin/TextLink/ExternalTextLink'
import type { Address } from 'viem'

import { EXPLORERS } from '@/constants/external-services'
import { truncateAddress } from '@/utils/truncate-address'

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
