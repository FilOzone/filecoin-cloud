import { TanstackTable } from '@/components/TanstackTable'

import type { ServiceProvider } from '@/schemas/providerSchema'

import { columns } from '../data/columnDefinition'

export type ServiceProvidersTableProps = {
  data: Array<ServiceProvider>
}

export function ServiceProvidersTable({ data }: ServiceProvidersTableProps) {
  return <TanstackTable data={data} columns={columns} />
}
