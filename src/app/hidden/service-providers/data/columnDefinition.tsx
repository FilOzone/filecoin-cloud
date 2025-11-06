import { createColumnHelper } from '@tanstack/react-table'

import { CompactAddress } from '@/components/CompactAddress'
import { ID } from '@/components/ID'

import { ProviderTableInpiStatus } from '@/app/hidden/warm-storage-service/components/ProviderTableInpiStatus'
import { ProviderTableOverview } from '@/app/hidden/warm-storage-service/components/ProviderTableOverview'
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
      address: row.serviceProviderAddress,
      serviceUrl: row.serviceUrl,
      softwareVersion: row.softwareVersion,
    }),
    {
      id: 'provider',
      header: 'Provider',
      maxSize: 380,
      cell: (info) => {
        const { name, description, address, serviceUrl, softwareVersion } =
          info.getValue()

        return (
          <ProviderTableOverview
            name={name}
            description={description}
            address={address}
            serviceUrl={serviceUrl}
            softwareVersion={softwareVersion}
          />
        )
      },
    },
  ),
  // TODO: accessor "id" to be replaced with proper key once available in the data schema
  columnHelper.accessor('id', {
    header: 'Service Offered',
    cell: () => '-',
  }),
  columnHelper.accessor('serviceStatus', {
    header: 'Service Status',
    cell: (info) => info.getValue() || '-',
  }),
  columnHelper.accessor('location', {
    header: 'Location',
    cell: (info) => info.getValue(),
  }),
  // TODO: accessor "id" to be replaced with proper key once available in the data schema
  columnHelper.accessor('id', {
    header: 'Capacity (TiB)',
    cell: () => '-',
  }),
  // TODO: accessor "id" to be replaced with proper key once available in the data schema
  columnHelper.accessor('id', {
    header: 'Proving Period',
    cell: () => '-',
  }),
  columnHelper.accessor('serviceProviderAddress', {
    header: 'Address',
    cell: (info) => <CompactAddress address={info.getValue()} />,
  }),
  columnHelper.accessor('ipniIpfs', {
    header: 'Publish to IPNI',
    cell: (info) => <ProviderTableInpiStatus published={info.getValue()} />,
  }),
  columnHelper.accessor('peerId', {
    header: 'Peer ID',
    cell: (info) => info.getValue() || '-',
  }),
]
