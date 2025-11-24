'use client'

import { EmptyStateCard } from '@filecoin-foundation/ui-filecoin/EmptyStateCard'
import { RefreshButton } from '@filecoin-foundation/ui-filecoin/RefreshButton'
import { SearchInput } from '@filecoin-foundation/ui-filecoin/SearchInput'
import { TanstackTable } from '@filecoin-foundation/ui-filecoin/Table/TanstackTable'
import { MagnifyingGlassIcon } from '@phosphor-icons/react'
import {
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { NetworkSelector } from '@/components/NetworkSelector'

import { useProviders } from '@/app/warm-storage-service/hooks/use-providers'
import type { ServiceProvider } from '@/schemas/provider-schema'

import { columns } from '../data/column-definition'
import { globalTableSearchFn } from '../utils/global-table-search'

export type ServiceProvidersTableProps = {
  data: Array<ServiceProvider>
}

export function ServiceProvidersTable({ data }: ServiceProvidersTableProps) {
  const { data: providers, isRefetching, refetch } = useProviders()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: globalTableSearchFn,
  })

  const canRefreshTable = providers && !isRefetching

  const searchQuery = table.getState().globalFilter?.toString() || ''
  const hasSearchResults = Boolean(table.getRowModel().rows.length)

  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-6 pb-6">
        <div className="md:w-96 w-full">
          <SearchInput value={searchQuery} onChange={table.setGlobalFilter} />
        </div>

        <div className="flex flex-wrap gap-6 grow md:grow-0">
          <div className="md:w-56 w-full">
            <NetworkSelector />
          </div>

          <RefreshButton
            onClick={() => refetch()}
            disabled={!canRefreshTable}
            baseDomain=""
          />
        </div>
      </div>

      {hasSearchResults ? (
        <TanstackTable table={table} />
      ) : (
        <EmptyStateCard
          icon={MagnifyingGlassIcon}
          title="No providers match your search"
          titleTag="h3"
          description="There are no providers available for this search query. Try updating your search terms."
        />
      )}
    </>
  )
}
