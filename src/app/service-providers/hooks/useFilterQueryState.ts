import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from 'nuqs'
import { useCallback, useMemo } from 'react'

import type { ServiceTier } from '@/utils/service-tier'
import { toggleValueInArray } from '@/utils/toggle-value-in-array'

import { parseNumericInput } from '../utils/parse-numeric-input'
import { parseAsServiceTier } from '../utils/parse-service-tier'

export type FilterState = {
  status: Array<string>
  location: Array<string>
  capacityMin: number | null
  capacityMax: number | null
  provingPeriodMin: number | null
  provingPeriodMax: number | null
  ipni: Array<string>
  serviceTier: Array<ServiceTier>
}

const filterParsers = {
  status: parseAsArrayOf(parseAsString).withDefault([]),
  location: parseAsArrayOf(parseAsString).withDefault([]),
  capacityMin: parseAsInteger,
  capacityMax: parseAsInteger,
  provingPeriodMin: parseAsInteger,
  provingPeriodMax: parseAsInteger,
  ipni: parseAsArrayOf(parseAsString).withDefault([]),
  serviceTier: parseAsArrayOf(parseAsServiceTier).withDefault([]),
}

type ArrayKeys<T> = {
  [K in keyof T]: T[K] extends Array<unknown> ? K : never
}[keyof T]

type NumberKeys<T> = {
  [K in keyof T]: T[K] extends number | null ? K : never
}[keyof T]

export function useFilterQueryState() {
  const [filterQueries, setFilterQueries] = useQueryStates(filterParsers)

  const toggleFilterQuery = useCallback(
    <K extends ArrayKeys<FilterState>>(
      key: K,
      value: FilterState[K] extends Array<infer U> ? U : never,
    ) => {
      setFilterQueries((prev) => {
        const currentArray = prev[key]
        // @ts-expect-error - Generic array toggle works for both string[] and number[]
        const updated = toggleValueInArray(currentArray, value)
        return { ...prev, [key]: updated }
      })
    },
    [setFilterQueries],
  )

  const updateNumberQuery = useCallback(
    (key: NumberKeys<FilterState>, value: string) => {
      const updated = parseNumericInput(value)
      setFilterQueries((prev) => ({ ...prev, [key]: updated }))
    },
    [setFilterQueries],
  )

  const hasActiveFilters = useMemo(() => {
    return Object.values(filterQueries).some((value) => {
      if (Array.isArray(value)) {
        return value.length > 0
      }
      return value !== null
    })
  }, [filterQueries])

  const activeFilterCount = useMemo(() => {
    return Object.entries(filterQueries).reduce((count, [_, value]) => {
      if (Array.isArray(value)) return count + (value.length > 0 ? 1 : 0)
      if (value != null) return count + 1
      return count
    }, 0)
  }, [filterQueries])

  return {
    filterQueries,
    hasActiveFilters,
    activeFilterCount,
    toggleFilterQuery,
    updateNumberQuery,
    clearFilterQueries: () => setFilterQueries(null),
  } as const
}
