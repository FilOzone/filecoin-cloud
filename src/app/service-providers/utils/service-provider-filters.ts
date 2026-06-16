import type { FilterFn } from '@tanstack/react-table'

import type {
  ServiceProvider,
  ServiceProviderRow,
} from '@/schemas/provider-schema'
import { getServiceTier } from '@/utils/service-tier'

import { getYesNoFromBoolean } from './get-yes-no-from-boolean'
import type { Range } from './map-filter-state-to-column-filters'
import type { FilterState } from '../hooks/use-filter-query-state'

// Base filter fns read only on-chain fields, so they stay typed to
// `ServiceProvider` and remain shared with the warm-storage table. Only
// `reachableFilterFn` needs the runtime-augmented `ServiceProviderRow`.
export const locationFilterFn: FilterFn<ServiceProvider> = (
  row,
  _columnId,
  filterValue,
) => {
  const locationArray = filterValue as FilterState['location']
  if (locationArray.length === 0) return true

  const location = row.original.location
  return locationArray.includes(location)
}

export const ipniFilterFn: FilterFn<ServiceProvider> = (
  row,
  _columnId,
  filterValue,
) => {
  const ipniArray = filterValue as FilterState['ipni']
  if (ipniArray.length === 0) return true

  const ipniIpfs = row.original.ipniIpfs
  const ipniValue = getYesNoFromBoolean(ipniIpfs)
  return ipniArray.includes(ipniValue)
}

export const reachableFilterFn: FilterFn<ServiceProviderRow> = (
  row,
  _columnId,
  filterValue,
) => {
  const reachableArray = filterValue as FilterState['reachable']
  if (reachableArray.length === 0) return true

  // Reachability is determined by a live /pdp/ping probe (see services/providers/ping.ts).
  // While that probe is still in flight, keep the row visible so a filtered
  // view never hides a node just because its result hasn't arrived yet.
  if (row.original.runtimeStatus === 'pending') return true

  const reachableValue: FilterState['reachable'][number] = row.original
    .reachable
    ? 'true'
    : 'false'
  return reachableArray.includes(reachableValue)
}

export const capacityRangeFilterFn: FilterFn<ServiceProvider> = (
  row,
  _columnId,
  filterValue,
) => {
  const { min, max } = filterValue as Range

  const hasMinFilter = min !== null
  const hasMaxFilter = max !== null

  const noFilterApplied = !hasMinFilter && !hasMaxFilter
  if (noFilterApplied) return true

  const capacity = row.original.capacityTb
  if (!capacity) return false

  const capacityNum = Number(capacity)

  if (hasMinFilter && capacityNum < min) return false
  if (hasMaxFilter && capacityNum > max) return false

  return true
}

export const serviceTierFilterFn: FilterFn<ServiceProvider> = (
  row,
  _columnId,
  filterValue,
) => {
  const serviceTierArray = filterValue as FilterState['serviceTier']
  if (serviceTierArray.length === 0) return true

  const tier = getServiceTier(row.original.isActive, row.original.isApproved)
  return serviceTierArray.includes(tier)
}
