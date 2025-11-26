import type { FilterFn } from '@tanstack/react-table'

import type { ServiceProvider } from '@/schemas/provider-schema'

export const globalTableSearchFn: FilterFn<ServiceProvider> = (
  row,
  _columnId,
  filterValue,
) => {
  const searchValue = String(filterValue).toLowerCase()
  const provider = row.original

  const searchableFields = [
    provider.name,
    provider.description,
    provider.location,
    provider.peerId,
  ]

  return searchableFields.some((field) =>
    field?.toLowerCase().includes(searchValue),
  )
}
