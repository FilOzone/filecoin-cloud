import type { FilterFn } from '@tanstack/react-table'

import type { ServiceProvider } from '@/schemas/provider-schema'

import { getYesNoFromBoolean } from './get-yes-no-from-boolean'
import type { FilterState } from '../hooks/useFilterQueryState'

type RangeFilter = {
  min: FilterState['capacityMin']
  max: FilterState['capacityMax']
}

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
  const range = filterValue as RangeFilter
  const { min, max } = range
  
  // If no filter is applied, show all rows including those without capacity data
  if (min === null && max === null) return true
  
  const capacity = row.original.capacityTb
  
  // If filter IS applied but row has no capacity data, exclude it from results
  if (!capacity) return false
  
  const capacityNum = Number(capacity)

  if (min !== null && capacityNum < min) return false
  if (max !== null && capacityNum > max) return false

  return true
}

export const provingPeriodRangeFilterFn: FilterFn<ServiceProvider> = (
  row,
  _columnId,
  filterValue,
) => {
  const range = filterValue as RangeFilter
  const provingPeriod = row.original.minProvingPeriod
  const provingPeriodNum = Number(provingPeriod)
  const { min, max } = range

  if (min !== null && provingPeriodNum < min) return false
  if (max !== null && provingPeriodNum > max) return false

  return true
}
