export function isValidUrl(url: string) {
  if (!url) return false
  
  try {
    const parsed = new URL(url)
    return ['http:', 'https:'].includes(parsed.protocol)
  } catch {
    return false
  }
}
