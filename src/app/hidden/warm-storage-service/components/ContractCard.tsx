import { ExternalTextLink } from '@filecoin-foundation/ui-filecoin/TextLink/ExternalTextLink'
import type { Address } from 'viem'

import { truncateAddress } from '../utils/truncateAddress'

type ContractCardProps = {
  label: string
  address: Address
  href: string
}

export function ContractCard({ label, address, href }: ContractCardProps) {
  return (
    <li className="border relative border-(--color-border-base) p-6 flex flex-col gap-1.5 hover:bg-zinc-50 rounded-2xl focus-within:bg-zinc-50 focus-within:border-brand-600 cursor-pointer">
      <p className="text-(--color-paragraph-text)">{label}</p>
      <ExternalTextLink href={href}>
        <span className="text-brand-800 font-medium">
          {truncateAddress(address)}
        </span>
        <span className="sr-only">
          View {label} contract address {address} on explorer
        </span>
      </ExternalTextLink>
    </li>
  )
}
