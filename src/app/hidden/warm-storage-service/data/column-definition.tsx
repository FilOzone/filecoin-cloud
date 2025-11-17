import { ID } from '@filecoin-foundation/ui-filecoin/Table/ID'
import { PeerID } from '@filecoin-foundation/ui-filecoin/Table/PeerID'
import { YesNoStatus } from '@filecoin-foundation/ui-filecoin/Table/YesNoStatus'
import { createColumnHelper } from '@tanstack/react-table'

import { CompactAddress } from '@/components/CompactAddress'
import { ProviderOverview } from '@/components/ProviderOverview'
import { SoftwareVersion } from '@/components/SoftwareVersion'

import type { ServiceProvider } from '@/schemas/provider-schema'

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
    }),
    {
      id: 'provider',
      header: 'Provider',
      cell: (info) => {
        const { name, description, address, serviceUrl } = info.getValue()

        return (
          <ProviderOverview
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
    header: 'Status',
    cell: (info) => info.getValue() || '-',
  }),
  columnHelper.accessor('softwareVersion', {
    header: 'Version',
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
    cell: (info) => {
      const isPublished = info.getValue()
      return <YesNoStatus status={isPublished ? 'yes' : 'no'} />
    },
  }),
  columnHelper.accessor('peerId', {
    id: 'peerId',
    header: 'Peer ID',
    cell: (info) => <PeerID id={info.getValue() || '-'} />,
  }),
]
