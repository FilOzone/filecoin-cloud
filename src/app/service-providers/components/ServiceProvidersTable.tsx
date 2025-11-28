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
import {
  capacityRangeFilterFn,
  countryFilterFn,
  ipniFilterFn,
  provingPeriodRangeFilterFn,
  statusFilterFn,
} from '@/utils/service-provider-filters'

import { ResetTableFilters } from './ResetTableFilters'
import { TableFilters } from './TableFilters'
import { columns } from '../data/column-definition'
import { useFilterOptions } from '../hooks/useFilterOptions'
import type { FilterState } from '../hooks/useFilterQueryState'
import { useFilterQueryState } from '../hooks/useFilterQueryState'
import { useSearchQueryState } from '../hooks/useSearchQueryState'
import { useSortingQueryState } from '../hooks/useSortingQueryState'

function transformFilterStateToColumnFilters(filterState: FilterState) {
  const columnFilters = []

  if (filterState.status.length > 0) {
    columnFilters.push({ id: 'serviceStatus', value: filterState.status })
  }
  if (filterState.country.length > 0) {
    columnFilters.push({ id: 'location', value: filterState.country })
  }
  if (filterState.ipni.length > 0) {
    columnFilters.push({ id: 'ipniIpfs', value: filterState.ipni })
  }
  if (filterState.capacityMin !== null || filterState.capacityMax !== null) {
    columnFilters.push({
      id: 'capacityTb',
      value: { min: filterState.capacityMin, max: filterState.capacityMax },
    })
  }
  if (
    filterState.provingPeriodMin !== null ||
    filterState.provingPeriodMax !== null
  ) {
    columnFilters.push({
      id: 'minProvingPeriod',
      value: {
        min: filterState.provingPeriodMin,
        max: filterState.provingPeriodMax,
      },
    })
  }

  return columnFilters
}

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
    () => transformFilterStateToColumnFilters(filterQueries),
    [filterQueries],
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: globalTableSearchFn,
    filterFns: {
      statusFilter: statusFilterFn,
      countryFilter: countryFilterFn,
      ipniFilter: ipniFilterFn,
      capacityRangeFilter: capacityRangeFilterFn,
      provingPeriodRangeFilter: provingPeriodRangeFilterFn,
    },
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
          <ResetTableFilters />
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
