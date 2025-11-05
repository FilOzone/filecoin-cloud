export function parseLocation(location: string) {
  const trimmed = location?.trim()

  if (!trimmed) return 'N/A'

  const normalized = trimmed.toLowerCase()
  if (normalized === 'unknown' || normalized === 'n/a') {
    return 'N/A'
  }

  if (!location.includes('=')) {
    return trimmed
  }

  const separator = location.includes(';') ? ';' : '/'
  const parts = location.split(separator)
  let state = ''
  let country = ''

  for (const part of parts) {
    if (!part.includes('=')) continue

    const [key, value] = part.split('=', 2)
    if (!key || !value) continue

    const normalizedKey = key.trim().toUpperCase()
    const trimmedValue = value.trim()

    if (normalizedKey === 'ST' || normalizedKey === 'S') {
      state = trimmedValue
    } else if (normalizedKey === 'C') {
      country = trimmedValue
    }
  }

  const locationParts = [state, country].filter(Boolean)
  return locationParts.length > 0 ? locationParts.join(', ') : 'N/A'
}
