'use client'

import { SearchInput } from '@filecoin-foundation/ui-filecoin/SearchInput'
import { TanstackTable } from '@filecoin-foundation/ui-filecoin/Table/TanstackTable'
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type OnChangeFn,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useCallback, useMemo } from 'react'

import { NetworkSelector } from '@/components/NetworkSelector'
import { ProvidersEmptySearchState } from '@/components/ProvidersEmptySearchState'

import { useSearchQueryState } from '@/hooks/use-search-query-state'
import type { ServiceProvider } from '@/schemas/provider-schema'
import { globalTableSearchFn } from '@/utils/global-table-search'

import { TableFilters } from './TableFilters'
import { columns } from '../data/column-definition'
import { useFilterOptions } from '../hooks/useFilterOptions'
import { useFilterQueryState } from '../hooks/useFilterQueryState'
import { useSortingQueryState } from '../hooks/useSortingQueryState'
import { mapFilterStateToColumnFilters } from '../utils/map-filter-state-to-column-filters'

export type ServiceProvidersTableProps = {
  data: Array<ServiceProvider>
}

export function ServiceProvidersTable({ data }: ServiceProvidersTableProps) {
  const { searchQuery, setSearchQuery } = useSearchQueryState()
  const { sortQuery, setSortQuery } = useSortingQueryState()
  const { filterQueries } = useFilterQueryState()

  const filterOptions = useFilterOptions(data)

  const sortingState: SortingState = useMemo(
    () => (sortQuery ? [sortQuery] : []),
    [sortQuery],
  )

  const handleSortingChange: OnChangeFn<SortingState> = useCallback(
    (updater) => {
      const newSortingState =
        typeof updater === 'function' ? updater(sortingState) : updater
      setSortQuery(newSortingState[0] || null)
    },
    [setSortQuery, sortingState],
  )

  const columnFilters = useMemo(
    () => mapFilterStateToColumnFilters(filterQueries),
    [filterQueries],
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: globalTableSearchFn,
    state: {
      globalFilter: searchQuery,
      sorting: sortingState,
      columnFilters,
    },
    onGlobalFilterChange: setSearchQuery,
    onSortingChange: handleSortingChange,
  })

  const hasSearchResults = Boolean(table.getRowModel().rows.length)

  return (
    <>
      <div className="flex flex-col sm:flex-row md:items-center md:justify-between gap-6">
        <div className="md:w-96 w-full">
          <SearchInput value={searchQuery} onChange={setSearchQuery} />
        </div>

        <div className="flex gap-6 grow md:grow-0">
          <div className="md:w-48 w-full">
            <TableFilters options={filterOptions} />
          </div>
          <div className="md:w-56">
            <NetworkSelector />
          </div>
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
