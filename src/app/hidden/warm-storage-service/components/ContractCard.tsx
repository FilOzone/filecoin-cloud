import { ExternalLink } from '@/components/ExternalLink'

import { shortenAddress } from '../utils/shortenAddress'

type ContractCardProps = {
  label: string
  address: string
  href: string
}

export function ContractCard({ label, address, href }: ContractCardProps) {
  return (
    <div className="border relative border-(--color-border-base) p-6 flex flex-col gap-1.5 hover:bg-zinc-50 rounded-2xl focus-within:bg-zinc-50 focus-within:border-brand-600 cursor-pointer">
      <p className="text-(--color-paragraph-text)">{label}</p>
      <span className="text-brand-800 font-medium">
        {shortenAddress({ address })}
      </span>
      <ExternalLink href={href}>
        <span className="sr-only">
          View {label} contract address {shortenAddress({ address })} on
          explorer
        </span>
      </ExternalLink>
    </div>
  )
}
