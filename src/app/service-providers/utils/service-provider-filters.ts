import type { FilterFn } from '@tanstack/react-table'

import type { ServiceProvider } from '@/schemas/provider-schema'

import { getYesNoFromBoolean } from './get-yes-no-from-boolean'
import type { Range } from './map-filter-state-to-column-filters'
import type { FilterState } from '../hooks/useFilterQueryState'

export const statusFilterFn: FilterFn<ServiceProvider> = (
  row,
  _columnId,
  filterValue,
) => {
  const statusArray = filterValue as FilterState['status']
  if (statusArray.length === 0) return true

  const serviceStatus = row.original.serviceStatus
  return serviceStatus ? statusArray.includes(serviceStatus) : false
}

export const countryFilterFn: FilterFn<ServiceProvider> = (
  row,
  _columnId,
  filterValue,
) => {
  const countryArray = filterValue as FilterState['country']
  if (countryArray.length === 0) return true

  const location = row.original.location
  return countryArray.includes(location)
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

export const provingPeriodRangeFilterFn: FilterFn<ServiceProvider> = (
  row,
  _columnId,
  filterValue,
) => {
  const { min, max } = filterValue as Range

  const hasMinFilter = min !== null
  const hasMaxFilter = max !== null

  const noFilterApplied = !hasMinFilter && !hasMaxFilter
  if (noFilterApplied) return true

  const provingPeriodNum = Number(row.original.minProvingPeriod)

  if (hasMinFilter && provingPeriodNum < min) return false
  if (hasMaxFilter && provingPeriodNum > max) return false

  return true
}
