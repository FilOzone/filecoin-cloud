import { createColumnHelper } from '@tanstack/react-table'

import { ID } from '@/components/ID'

import type { Transaction } from '../types/transaction'

// Column definitions
const columnHelper = createColumnHelper<Transaction>()

export const columns = [
  columnHelper.accessor('railId', {
    header: 'Rail ID',
    cell: (info) => <ID number={info.getValue()} />,
  }),
  columnHelper.accessor('payer', {
    header: 'Payer',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('payee', {
    header: 'Payee',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('operator', {
    header: 'Operator',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => (
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 bg-blue-500 rounded-full" />
        {info.getValue()}
      </div>
    ),
  }),
  columnHelper.accessor('paymentRate', {
    header: 'Payment Rate',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('settledAmount', {
    header: 'Settled Amount',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('date', {
    header: 'Date',
    cell: (info) => info.getValue(),
  }),
]
