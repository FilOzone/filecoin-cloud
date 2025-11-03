export type CompactAddressProps = {
  address: string
}

export function CompactAddress({ address }: CompactAddressProps) {
  return (
    <span className="text-base font-medium text-brand-800" title={address}>
      {address.slice(0, 6)}...{address.slice(-4)}
    </span>
  )
}
