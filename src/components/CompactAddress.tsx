import { ExternalTextLink } from '@filecoin-foundation/ui-filecoin/TextLink/ExternalTextLink'
import type { Address } from 'viem'

import { EXPLORERS } from '@/constants/externalServices'
import { truncateAddress } from '@/utils/truncateAddress'

export type CompactAddressProps = {
  address: Address
}

export function CompactAddress({ address }: CompactAddressProps) {
  return (
    <ExternalTextLink
      href={`${EXPLORERS.BLOCKSCOUT.calibration}${address}`}
      aria-label={`View address ${address} on Block Explorer`}
      title={address}
      className="whitespace-nowrap"
    >
      <span className="font-medium">{truncateAddress(address)}</span>
    </ExternalTextLink>
  )
}
