import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs'
import { parseAsArrayOf } from 'nuqs/server'

export type FilterState = {
  status: Array<string>
  country: Array<string>
  capacityMin: number | null
  capacityMax: number | null
  provingPeriodMin: number | null
  provingPeriodMax: number | null
  ipni: Array<string>
}

const filterParsers = {
  status: parseAsArrayOf(parseAsString).withDefault([]),
  country: parseAsArrayOf(parseAsString).withDefault([]),
  capacityMin: parseAsInteger,
  capacityMax: parseAsInteger,
  provingPeriodMin: parseAsInteger,
  provingPeriodMax: parseAsInteger,
  ipni: parseAsArrayOf(parseAsString).withDefault([]),
}

export function useFilterQueryState() {
  const [filterQueries, setFilterQueries] = useQueryStates(filterParsers, {
    shallow: false,
  })

  return {
    filterQueries,
    setFilterQueries,
    clearFilterQueries: () => setFilterQueries(null),
  } as const
}
