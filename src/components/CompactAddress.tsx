import type { Address } from 'viem'

import { truncateAddress } from '@/utils/truncateAddress'

export type CompactAddressProps = {
  address: Address
}

export function CompactAddress({ address }: CompactAddressProps) {
  return (
    <span className="text-base font-medium text-brand-800" title={address}>
      {truncateAddress(address)}
    </span>
  )
}
