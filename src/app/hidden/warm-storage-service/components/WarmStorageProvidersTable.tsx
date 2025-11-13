import { TanstackTable } from '@filecoin-foundation/ui-filecoin/Table/TanstackTable'

import type { ServiceProvider } from '@/schemas/provider-schema'

import { columns } from '../data/column-definition'

export type WarmStorageProvidersTableProps = {
  data: Array<ServiceProvider>
}

export function WarmStorageProvidersTable({
  data,
}: WarmStorageProvidersTableProps) {
  return <TanstackTable data={data} columns={columns} />
}
