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

import type { ServiceProvider } from '@/schemas/provider-schema'
import { globalTableSearchFn } from '@/utils/global-table-search'

import { columns } from '../data/column-definition'
import { useProviders } from '../hooks/use-providers'

export type WarmStorageProvidersTableProps = {
  data: Array<ServiceProvider>
}

export function WarmStorageProvidersTable({
  data,
}: WarmStorageProvidersTableProps) {
  const { isRefetching, refetch } = useProviders({ filter: 'approved' })

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
      <div className="flex items-center justify-between flex-wrap gap-6 pb-6">
        <div className="md:w-96 w-full">
          <SearchInput value={searchQuery} onChange={table.setGlobalFilter} />
        </div>

        <RefreshButton
          onClick={() => refetch()}
          disabled={!isRefetching}
          baseDomain=""
        />
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
