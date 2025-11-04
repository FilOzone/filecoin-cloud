import type { Address } from 'viem'

import { ExternalLink } from '@/components/ExternalLink'

import { truncateAddress } from '../../../../utils/truncateAddress'

export type ContractCardProps = {
  label: string
  address: Address
  href: string
}

export function ContractCard({ label, address, href }: ContractCardProps) {
  return (
    <li className="border relative border-(--color-border-base) p-6 flex flex-col gap-1.5 hover:bg-zinc-50 rounded-2xl focus-within:bg-zinc-50 focus-within:border-brand-600">
      <p className="text-(--color-paragraph-text)">{label}</p>
      <ExternalLink href={href} className="after:absolute after:inset-0">
        <span className="text-brand-800 font-medium">
          {truncateAddress(address)}
        </span>
        <span className="sr-only">
          View {label} contract address {address} on explorer
        </span>
      </ExternalLink>
    </li>
  )
}
