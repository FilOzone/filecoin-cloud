import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs'
import { useCallback } from 'react'

import { toggleValueInArray } from '@/app/service-providers/utils/toggle-value-in-array'

const LOCATION_KEY = 'location'

export function useLocationQueryState() {
  const [locations, setLocations] = useQueryState(
    LOCATION_KEY,
    parseAsArrayOf(parseAsString).withDefault([]),
  )

  const toggleLocation = useCallback(
    (location: string) => {
      setLocations((prev) => {
        const updated = toggleValueInArray(prev, location)
        return updated
      })
    },
    [setLocations],
  )

  return {
    locations,
    toggleLocation,
    hasActiveLocations: locations.length > 0,
    isLocationActive: (location: string) => locations.includes(location),
    clearLocations: () => setLocations([]),
  }
}
