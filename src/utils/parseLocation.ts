export function parseLocation(location: string): string {
  if (!location || !location.trim()) {
    return 'N/A'
  }

  const normalized = location.trim().toLowerCase()
  if (normalized === 'unknown' || normalized === 'n/a') {
    return 'N/A'
  }

  if (location.includes('=')) {
    const separator = location.includes(';') ? ';' : '/'
    const parts = location.split(separator)
    let state = ''
    let country = ''

    for (const part of parts) {
      if (part.includes('=')) {
        const [key, value] = part.split('=', 2)
        if (key && value) {
          const normalizedKey = key.trim().toUpperCase()
          const trimmedValue = value.trim()

          if (normalizedKey === 'ST' || normalizedKey === 'S') {
            state = trimmedValue
          } else if (normalizedKey === 'C') {
            country = trimmedValue
          }
        }
      }
    }

    const locationParts: string[] = []
    if (state) locationParts.push(state)
    if (country) locationParts.push(country)

    if (locationParts.length > 0) {
      return locationParts.join(', ')
    }

    return 'N/A'
  }

  return location.trim()
}
