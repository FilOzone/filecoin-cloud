import type { ServiceProvider } from '@/schemas/provider-schema'

import type { FilterState } from '../hooks/useFilterQueryState'

type Range = {
  min: number | null
  max: number | null
}

// Same shape as ColumnFiltersState from @tanstack/react-table
type ServiveProviderColumnFilters = Array<{
  id: keyof ServiceProvider
  value: Array<string> | Range
}>

export function mapFilterStateToColumnFilters({
  status,
  country,
  capacityMin,
  capacityMax,
  provingPeriodMin,
  provingPeriodMax,
  ipni,
}: FilterState) {
  const columnFilters: ServiveProviderColumnFilters = []

  if (status.length > 0) {
    columnFilters.push({ id: 'serviceStatus', value: status })
  }
  if (country.length > 0) {
    columnFilters.push({ id: 'location', value: country })
  }
  if (ipni.length > 0) {
    columnFilters.push({ id: 'ipniIpfs', value: ipni })
  }
  if (capacityMin !== null || capacityMax !== null) {
    columnFilters.push({
      id: 'capacityTb',
      value: { min: capacityMin, max: capacityMax },
    })
  }
  if (provingPeriodMin !== null || provingPeriodMax !== null) {
    columnFilters.push({
      id: 'minProvingPeriod',
      value: {
        min: provingPeriodMin,
        max: provingPeriodMax,
      },
    })
  }

  return columnFilters
}
