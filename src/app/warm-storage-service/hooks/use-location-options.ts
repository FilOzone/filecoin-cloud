import { useMemo } from 'react'

import type { ServiceProvider } from '@/schemas/provider-schema'

export function useLocationOptions(data: Array<ServiceProvider>) {
  return useMemo(() => {
    if (data.length === 0) {
      return []
    }

    const locations = new Set<string>()

    for (const provider of data) {
      locations.add(provider.location)
    }

    return Array.from(locations).sort()
  }, [data])
}
