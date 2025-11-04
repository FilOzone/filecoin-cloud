import type { Address } from 'viem'

import { BLOCK_EXPLORER_CALIBRATION } from '@/constants/siteMetadata'
import { truncateAddress } from '@/utils/truncateAddress'

import { ExternalLink } from './ExternalLink'

export type CompactAddressProps = {
  address: Address
}

export function CompactAddress({ address }: CompactAddressProps) {
  return (
    <ExternalLink
      href={`${BLOCK_EXPLORER_CALIBRATION}${address}`}
      aria-label={`View address ${address} on Block Explorer`}
    >
      <span className="text-base font-medium text-brand-800" title={address}>
        {truncateAddress(address)}
      </span>
    </ExternalLink>
  )
}
