import { TanstackTable } from '@filecoin-foundation/ui-filecoin/Table/TanstackTable'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'

import type { ServiceProvider } from '@/schemas/provider-schema'

import { columns } from '../data/column-definition'

export type WarmStorageProvidersTableProps = {
  data: Array<ServiceProvider>
}

export function WarmStorageProvidersTable({
  data,
}: WarmStorageProvidersTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return <TanstackTable table={table} />
}
