export function bytesToBase58(bytes: Uint8Array) {
  const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'

  if (bytes.length === 0) return ''

  let num = BigInt(0)
  for (let i = 0; i < bytes.length; i++) {
    num = num * BigInt(256) + BigInt(bytes[i])
  }

  let encoded = ''
  while (num > 0) {
    const remainder = Number(num % BigInt(58))
    encoded = alphabet[remainder] + encoded
    num = num / BigInt(58)
  }

  for (let i = 0; i < bytes.length && bytes[i] === 0; i++) {
    encoded = '1' + encoded
  }

  return encoded
}
