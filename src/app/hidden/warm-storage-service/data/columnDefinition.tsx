import { createColumnHelper } from '@tanstack/react-table'

import { CompactAddress } from '@/components/CompactAddress'
import { ID } from '@/components/ID'

import type { ServiceProvider } from '@/schemas/providerSchema'

import { ProviderTableInpiStatus } from '../components/ProviderTableInpiStatus'
import { ProviderTableOverview } from '../components/ProviderTableOverview'

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
          <ProviderTableOverview
            name={name}
            description={description}
            serviceUrl={serviceUrl}
            softwareVersion={softwareVersion}
          />
        )
      },
    },
  ),
  columnHelper.accessor('location', {
    header: 'Location',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('serviceProviderAddress', {
    header: 'Address',
    cell: (info) => <CompactAddress address={info.getValue()} />,
  }),
  columnHelper.accessor('ipniIpfs', {
    header: 'Publish to IPNI',
    cell: (info) => <ProviderTableInpiStatus published={info.getValue()} />,
  }),
]
