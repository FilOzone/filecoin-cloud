import { createColumnHelper } from '@tanstack/react-table'

import { CompactAddress } from '@/components/CompactAddress'
import { ID } from '@/components/ID'
import { StatusBadge } from '@/components/StatusBadge'

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
    cell: (info) => <CompactAddress address={info.getValue()} />,
  }),
  columnHelper.accessor('payee', {
    header: 'Payee',
    cell: (info) => <CompactAddress address={info.getValue()} />,
  }),
  columnHelper.accessor('operator', {
    header: 'Operator',
    cell: (info) => <CompactAddress address={info.getValue()} />,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => <StatusBadge status={info.getValue()} />,
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
    cell: (info) =>
      info.getValue().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
  }),
]
