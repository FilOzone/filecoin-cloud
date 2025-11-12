import { createColumnHelper } from '@tanstack/react-table'

import { CompactAddress } from '@/components/CompactAddress'
import { Id } from '@/components/Id'
import { PeerId } from '@/components/PeerId'
import { SoftwareVersion } from '@/components/SoftwareVersion'

import type { ServiceProvider } from '@/schemas/provider-schema'

import { ProviderTableInpiStatus } from '../components/ProviderTableInpiStatus'
import { ProviderTableOverview } from '../components/ProviderTableOverview'

const columnHelper = createColumnHelper<ServiceProvider>()

export const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (info) => <Id number={info.getValue()} />,
  }),
  columnHelper.accessor(
    (row) => ({
      name: row.name,
      description: row.description,
      address: row.serviceProviderAddress,
      serviceUrl: row.serviceUrl,
    }),
    {
      id: 'provider',
      header: 'Provider',
      cell: (info) => {
        const { name, description, address, serviceUrl } = info.getValue()

        return (
          <ProviderTableOverview
            name={name}
            description={description}
            address={address}
            serviceUrl={serviceUrl}
          />
        )
      },
    },
  ),
  columnHelper.accessor('serviceStatus', {
    header: 'Service Status',
    cell: (info) => info.getValue() || '-',
  }),
  columnHelper.accessor('softwareVersion', {
    header: 'Software Version',
    cell: (info) => {
      const softwareVersion = info.getValue()
      return softwareVersion ? <SoftwareVersion info={softwareVersion} /> : '-'
    },
  }),
  columnHelper.accessor('capacityTb', {
    header: 'Capacity (TiB)',
    cell: (info) => Number(info.getValue()).toLocaleString('en-US'),
  }),
  columnHelper.accessor('location', {
    header: 'Location',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('serviceProviderAddress', {
    header: 'Address',
    cell: (info) => <CompactAddress address={info.getValue()} />,
  }),
  columnHelper.accessor('ipniIpfs', {
    header: 'IPNI',
    cell: (info) => <ProviderTableInpiStatus published={info.getValue()} />,
  }),
  columnHelper.accessor('peerId', {
    id: 'peerId',
    header: 'Peer ID',
    cell: (info) => <PeerId id={info.getValue() || '-'} />,
  }),
]
