'use client'

import { RefreshButton } from '@filecoin-foundation/ui-filecoin/RefreshButton'
import { SearchInput } from '@filecoin-foundation/ui-filecoin/SearchInput'
import { TanstackTable } from '@filecoin-foundation/ui-filecoin/Table/TanstackTable'
import {
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { NetworkSelector } from '@/components/NetworkSelector'
import { ProvidersEmptySearchState } from '@/components/ProvidersEmptySearchState'
import { ProvidersTableFiltersContainer } from '@/components/ProvidersTableFiltersContainer'

import { useProviders } from '@/app/warm-storage-service/hooks/use-providers'
import type { ServiceProvider } from '@/schemas/provider-schema'
import { globalTableSearchFn } from '@/utils/global-table-search'

import { columns } from '../data/column-definition'

export type ServiceProvidersTableProps = {
  data: Array<ServiceProvider>
}

export function ServiceProvidersTable({ data }: ServiceProvidersTableProps) {
  const { isRefetching, refetch } = useProviders()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: globalTableSearchFn,
  })

  const searchQuery = table.getState().globalFilter?.toString() || ''
  const hasSearchResults = Boolean(table.getRowModel().rows.length)

  return (
    <>
      <ProvidersTableFiltersContainer>
        <div className="md:w-96 w-full">
          <SearchInput value={searchQuery} onChange={table.setGlobalFilter} />
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
