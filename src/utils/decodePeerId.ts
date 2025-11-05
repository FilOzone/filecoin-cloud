import bs58 from 'bs58'

export function decodePeerId(peerIdBytes: string) {
  if (!peerIdBytes) return ''

  try {
    let bytes: Uint8Array

    if (typeof peerIdBytes === 'string' && peerIdBytes.startsWith('0x')) {
      // Hex string format
      const hex = peerIdBytes.slice(2)
      bytes = new Uint8Array(
        hex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || [],
      )
    } else if (typeof peerIdBytes === 'string') {
      // Raw string format
      bytes = new Uint8Array(peerIdBytes.length)
      for (let i = 0; i < peerIdBytes.length; i++) {
        bytes[i] = peerIdBytes.charCodeAt(i)
      }
    } else {
      // Already in the right format or unknown
      return peerIdBytes
    }

    return bytes.length > 0 ? bs58.encode(bytes) : ''
  } catch (error) {
    console.error('Error decoding peer ID:', error)
    return ''
  }
}
