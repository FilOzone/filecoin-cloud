import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from 'nuqs'
import { useCallback, useMemo } from 'react'

import { toggleValueInArray } from '@/utils/toggle-value-in-array'

import { parseNumericInput } from '../utils/parse-numeric-input'

export type FilterState = {
  status: Array<string>
  location: Array<string>
  capacityMin: number | null
  capacityMax: number | null
  provingPeriodMin: number | null
  provingPeriodMax: number | null
  ipni: Array<string>
}

const filterParsers = {
  status: parseAsArrayOf(parseAsString).withDefault([]),
  location: parseAsArrayOf(parseAsString).withDefault([]),
  capacityMin: parseAsInteger,
  capacityMax: parseAsInteger,
  provingPeriodMin: parseAsInteger,
  provingPeriodMax: parseAsInteger,
  ipni: parseAsArrayOf(parseAsString).withDefault([]),
}

type ArrayStringKeys<T> = {
  [K in keyof T]: T[K] extends Array<string> ? K : never
}[keyof T]

type NumberKeys<T> = {
  [K in keyof T]: T[K] extends number | null ? K : never
}[keyof T]

export function useFilterQueryState() {
  const [filterQueries, setFilterQueries] = useQueryStates(filterParsers)

  const toggleFilterQuery = useCallback(
    (key: ArrayStringKeys<FilterState>, value: string) => {
      setFilterQueries((prev) => {
        const updated = toggleValueInArray(prev[key], value)
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

  return {
    filterQueries,
    hasActiveFilters,
    toggleFilterQuery,
    updateNumberQuery,
    clearFilterQueries: () => setFilterQueries(null),
  } as const
}
