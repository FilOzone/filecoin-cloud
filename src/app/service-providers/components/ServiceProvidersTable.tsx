'use client'

import { RefreshButton } from '@filecoin-foundation/ui-filecoin/RefreshButton'
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
import { ProvidersTableFiltersContainer } from '@/components/ProvidersTableFiltersContainer'

import { useProviders } from '@/app/warm-storage-service/hooks/use-providers'
import type { ServiceProvider } from '@/schemas/provider-schema'
import { globalTableSearchFn } from '@/utils/global-table-search'

import { TableFilters } from './TableFilters'
import { columns } from '../data/column-definition'
import { useFilterOptions } from '../hooks/useFilterOptions'
import { useFilterQueryState } from '../hooks/useFilterQueryState'
import { useSearchQueryState } from '../hooks/useSearchQueryState'
import { useSortingQueryState } from '../hooks/useSortingQueryState'
import { mapFilterStateToColumnFilters } from '../utils/map-filter-state-to-column-filters'

export type ServiceProvidersTableProps = {
  data: Array<ServiceProvider>
}

export function ServiceProvidersTable({ data }: ServiceProvidersTableProps) {
  const { isRefetching, refetch } = useProviders()

  const { searchQuery, setSearchQuery } = useSearchQueryState()
  const { sortQuery, setSortQuery } = useSortingQueryState()
  const { filterQueries, setFilterQueries } = useFilterQueryState()

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
      <ProvidersTableFiltersContainer>
        <div className="md:w-96 w-full">
          <SearchInput value={searchQuery} onChange={setSearchQuery} />
        </div>

        <div className="flex flex-wrap gap-6 grow md:grow-0">
          <div className="md:w-48 w-full">
            <TableFilters
              state={filterQueries}
              setState={setFilterQueries}
              options={filterOptions}
            />
          </div>
          <div className="md:w-56 w-full">
            <NetworkSelector />
          </div>

          <RefreshButton onClick={() => refetch()} disabled={isRefetching} />
        </div>
      </ProvidersTableFiltersContainer>

      {hasSearchResults ? (
        <TanstackTable table={table} />
      ) : (
        <ProvidersEmptySearchState />
      )}
    </>
  )
}
