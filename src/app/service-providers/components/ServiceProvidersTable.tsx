'use client'

import { RefreshButton } from '@filecoin-foundation/ui-filecoin/RefreshButton'
import {
  DEFAULT_SEARCH_QUERY,
  SEARCH_KEY,
} from '@filecoin-foundation/ui-filecoin/Search'
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
import { parseAsString, useQueryState } from 'nuqs'
import { useCallback, useMemo } from 'react'

import { NetworkSelector } from '@/components/NetworkSelector'
import { ProvidersEmptySearchState } from '@/components/ProvidersEmptySearchState'
import { ProvidersTableFiltersContainer } from '@/components/ProvidersTableFiltersContainer'

import { useProviders } from '@/app/warm-storage-service/hooks/use-providers'
import type { ServiceProvider } from '@/schemas/provider-schema'
import { globalTableSearchFn } from '@/utils/global-table-search'

import { columns } from '../data/column-definition'
import { useSortingQueryState } from '../hooks/useSortingQueryState'

export type ServiceProvidersTableProps = {
  data: Array<ServiceProvider>
}

export function ServiceProvidersTable({ data }: ServiceProvidersTableProps) {
  const { isRefetching, refetch } = useProviders()

  const [searchQuery, setSearchQuery] = useQueryState(
    SEARCH_KEY,
    parseAsString
      .withDefault(DEFAULT_SEARCH_QUERY)
      .withOptions({ throttleMs: 300 }),
  )

  const [sortUrlState, setSortUrlState] = useSortingQueryState()

  const sortingState: SortingState = useMemo(
    () => (sortUrlState ? [sortUrlState] : []),
    [sortUrlState],
  )

  const handleSortingChange: OnChangeFn<SortingState> = useCallback(
    (updater) => {
      const newSortingState =
        typeof updater === 'function' ? updater(sortingState) : updater
      setSortUrlState(newSortingState[0] || null)
    },
    [setSortUrlState, sortingState],
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
