import { TanstackTable } from '@/components/TanstackTable'

import type { ServiceProvider } from '@/schemas/providerSchema'

import { columns } from '../data/columnDefinition'

export type WarmStorageProvidersTableProps = {
  data: Array<ServiceProvider>
}

export function WarmStorageProvidersTable({
  data,
}: WarmStorageProvidersTableProps) {
  return <TanstackTable data={data} columns={columns} />
}
