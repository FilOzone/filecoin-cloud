'use client'

import { SearchInput } from '@filecoin-foundation/ui-filecoin/SearchInput'
import { TanstackTable } from '@filecoin-foundation/ui-filecoin/Table/TanstackTable'
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useMemo } from 'react'

import { ProvidersEmptySearchState } from '@/components/ProvidersEmptySearchState'

import type { ServiceProvider } from '@/schemas/provider-schema'
import { globalTableSearchFn } from '@/utils/global-table-search'

import { LocationFilter } from './LocationFilter'
import { columns } from '../data/column-definition'
import { useLocationOptions } from '../hooks/use-location-options'
import { useLocationQueryState } from '../hooks/use-location-query-state'
import { getColumnFilters } from '../utils/get-column-filters'

export type WarmStorageProvidersTableProps = {
  data: Array<ServiceProvider>
}

export function WarmStorageProvidersTable({
  data,
}: WarmStorageProvidersTableProps) {
  const { locations } = useLocationQueryState()
  const locationOptions = useLocationOptions(data)

  const columnFilters = useMemo(() => getColumnFilters(locations), [locations])

  const table = useReactTable({
    data,
    columns,
    enableMultiSort: false,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: globalTableSearchFn,
    state: { columnFilters },
  })

  const searchQuery = table.getState().globalFilter?.toString() || ''
  const hasSearchResults = Boolean(table.getRowModel().rows.length)

  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-6">
        <div className="sm:w-96 w-full">
          <SearchInput value={searchQuery} onChange={table.setGlobalFilter} />
        </div>

        <div className="sm:w-48 w-full">
          <LocationFilter options={locationOptions} />
        </div>
      </div>

      {hasSearchResults ? (
        <TanstackTable table={table} />
      ) : (
        <ProvidersEmptySearchState />
      )}
    </>
  )
}
