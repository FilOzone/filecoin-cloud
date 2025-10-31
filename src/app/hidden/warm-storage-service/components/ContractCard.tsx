import { shortenAddress } from '../utils/shortenAddress'

type ContractCardProps = {
  label: string
  address: string
}

export function ContractCard({ label, address }: ContractCardProps) {
  return (
    <div className="border border-(--color-border-base) rounded-2xl p-6 flex flex-col gap-1.5">
      <p className="text-(--color-paragraph-text)">{label}</p>
      <span className="text-brand-800 font-medium">
        {shortenAddress({ address })}
      </span>
    </div>
  )
}
