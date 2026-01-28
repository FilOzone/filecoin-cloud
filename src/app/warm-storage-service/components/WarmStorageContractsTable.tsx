'use client'

import { TanstackTable } from '@filecoin-foundation/ui-filecoin/Table/TanstackTable'
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import type { ContractInfo } from '../data/contracts-column-definition'
import { contractsColumns } from '../data/contracts-column-definition'

export type ContractsTableProps = {
  data: Array<ContractInfo>
}

export function WarmStorageContractsTable({ data }: ContractsTableProps) {
  const table = useReactTable({
    data,
    columns: contractsColumns,
    enableMultiSort: false,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return <TanstackTable table={table} />
}
