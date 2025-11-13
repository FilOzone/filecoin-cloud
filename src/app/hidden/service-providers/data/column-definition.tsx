import { ID } from '@filecoin-foundation/ui-filecoin/Table/ID'
import { PeerID } from '@filecoin-foundation/ui-filecoin/Table/PeerID'
import { YesNoStatus } from '@filecoin-foundation/ui-filecoin/Table/YesNoStatus'
import { createColumnHelper } from '@tanstack/react-table'

import { CompactAddress } from '@/components/CompactAddress'
import { ProviderTableOverview } from '@/components/ProviderTableOverview'
import { SoftwareVersion } from '@/components/SoftwareVersion'

import type { ServiceProvider } from '@/schemas/provider-schema'

const columnHelper = createColumnHelper<ServiceProvider>()

export const columns = [
  columnHelper.accessor('id', {
    id: 'id',
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
  columnHelper.accessor('location', {
    id: 'location',
    header: 'Location',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('capacityTb', {
    header: 'Capacity (TiB)',
    cell: (info) => {
      const capacity = info.getValue()
      if (!capacity) return '-'
      return Number(capacity).toLocaleString('en-US')
    },
  }),
  columnHelper.accessor('minProvingPeriod', {
    header: 'Proving Period',
    cell: (info) => Number(info.getValue()).toLocaleString('en-US'),
  }),
  columnHelper.accessor('serviceProviderAddress', {
    header: 'Address',
    cell: (info) => <CompactAddress address={info.getValue()} />,
  }),
  columnHelper.accessor('ipniIpfs', {
    header: 'IPNI',
    cell: (info) => {
      const isPublished = info.getValue()
      return <YesNoStatus status={isPublished ? 'yes' : 'no'} />
    },
  }),
  columnHelper.accessor('peerId', {
    header: 'Peer ID',
    cell: (info) => <PeerID id={info.getValue() || '-'} />,
  }),
]
