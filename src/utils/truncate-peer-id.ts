const ELLIPSIS = '...'

export function truncatePeerID(peerId: string, startLength = 8, endLength = 4) {
  const trimmedPeerId = peerId.trim()

  if (trimmedPeerId.length <= startLength + endLength + ELLIPSIS.length) {
    return trimmedPeerId
  }

  return `
    ${trimmedPeerId.slice(0, startLength)}
    ${ELLIPSIS}
    ${trimmedPeerId.slice(-endLength)}
  `
}
