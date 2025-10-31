type ShortenAddressProps = {
  address: string
  visibleChars?: number
}
export function shortenAddress({
  address,
  visibleChars = 4,
}: ShortenAddressProps) {
  if (address.length <= visibleChars * 2) return address
  const prefix = address.slice(0, visibleChars + 2)
  const suffix = address.slice(-visibleChars)
  return `${prefix}...${suffix}`
}
