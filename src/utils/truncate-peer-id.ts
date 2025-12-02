export function truncatePeerID(
  peerId: string | undefined | null,
  startLength = 8,
  endLength = 4,
) {
  if (!peerId) return ''
  const asString = String(peerId)
  // if it's already short enough, return as-is
  if (asString.length <= startLength + endLength + 3) return asString
  return `${asString.slice(0, startLength)}...${asString.slice(-endLength)}`
}
