import type { ServiceProvider } from '@/schemas/provider-schema'

// Same shape as ColumnFiltersState from @tanstack/react-table
type WarmStorageProviderColumnFilters = Array<{
  id: keyof ServiceProvider
  value: Array<string>
}>

export function getColumnFilters(locations: Array<string>) {
  const columnFilters: WarmStorageProviderColumnFilters =
    locations.length > 0 ? [{ id: 'location', value: locations }] : []

  return columnFilters
}
