export function bytesToString(bytes: string) {
  try {
    const hex = bytes.startsWith('0x') ? bytes.slice(2) : bytes
    const byteArray = new Uint8Array(
      hex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || [],
    )
    return new TextDecoder().decode(byteArray)
  } catch (error) {
    console.error('Error converting bytes to string:', error)
    return bytes
  }
}
