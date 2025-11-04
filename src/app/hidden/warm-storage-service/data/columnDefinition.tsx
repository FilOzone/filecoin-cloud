import { createColumnHelper } from '@tanstack/react-table'

import { ID } from '@/components/ID'

import type { ServiceProvider } from '@/schemas/providerSchema'

const columnHelper = createColumnHelper<ServiceProvider>()

export const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (info) => <ID number={info.getValue()} />,
  }),
  columnHelper.accessor(
    (row) => ({
      name: row.name,
      description: row.description,
      serviceUrl: row.serviceUrl,
      softwareVersion: row.softwareVersion,
    }),
    {
      id: 'provider',
      header: 'Provider',
      cell: (info) => {
        const { name, description, serviceUrl, softwareVersion } =
          info.getValue()
        return (
          <div className="flex flex-col gap-1">
            <div className="font-semibold">{name}</div>
            <div className="text-sm text-gray-600">{description}</div>
            {serviceUrl && (
              <div className="text-sm text-gray-500">{serviceUrl}</div>
            )}
            {softwareVersion && softwareVersion !== 'unknown' && (
              <div className="text-xs text-gray-400">v{softwareVersion}</div>
            )}
          </div>
        )
      },
    },
  ),
  columnHelper.accessor('location', {
    header: 'Location',
    cell: (info) => info.getValue() || '-',
  }),
  columnHelper.accessor('serviceProviderAddress', {
    header: 'Address',
    cell: (info) => (
      <div className="font-mono text-sm">{info.getValue() || '-'}</div>
    ),
  }),
  columnHelper.accessor('ipniIpfs', {
    header: 'Publish to IPNI',
    cell: (info) => (info.getValue() ? 'Yes' : 'No'),
  }),
]
