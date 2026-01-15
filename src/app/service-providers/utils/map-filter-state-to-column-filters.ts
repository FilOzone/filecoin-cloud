import type { ServiceProvider } from '@/schemas/provider-schema'
import type { ServiceTier } from '@/utils/service-tier'

import type { FilterState } from '../hooks/useFilterQueryState'

export type Range = {
  min: number | null
  max: number | null
}

// Same shape as ColumnFiltersState from @tanstack/react-table
type ServiveProviderColumnFilters = Array<{
  id: keyof ServiceProvider | 'serviceOffered'
  value: Array<string> | Array<ServiceTier> | Range
}>

export function mapFilterStateToColumnFilters({
  status,
  location,
  capacityMin,
  capacityMax,
  provingPeriodMin,
  provingPeriodMax,
  ipni,
  serviceTier,
}: FilterState) {
  const columnFilters: ServiveProviderColumnFilters = []

  if (status.length > 0) {
    columnFilters.push({ id: 'serviceStatus', value: status })
  }
  if (location.length > 0) {
    columnFilters.push({ id: 'location', value: location })
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
  if (serviceTier.length > 0) {
    columnFilters.push({ id: 'serviceOffered', value: serviceTier })
  }

  return columnFilters
}
