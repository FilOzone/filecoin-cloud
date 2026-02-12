import { ID } from '@filecoin-foundation/ui-filecoin/Table/ID'
import { createColumnHelper } from '@tanstack/react-table'

import { CompactPeerID } from '@/components/compact-peer-id'
import { PdpScanLink } from '@/components/PdpScanLink'
import { ProviderOverview } from '@/components/ProviderOverview'
import { SoftwareVersion } from '@/components/SoftwareVersion'

import { locationFilterFn } from '@/app/service-providers/utils/service-provider-filters'
import type { ServiceProvider } from '@/schemas/provider-schema'
import { sortSoftwareVersion } from '@/utils/sort-software-version'

const columnHelper = createColumnHelper<ServiceProvider>()

export const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (info) => <ID number={info.getValue()} />,
    sortingFn: 'basic',
  }),
  columnHelper.accessor((row) => row.name, {
    id: 'provider',
    header: 'Provider',
    cell: (info) => {
      const { name, description, serviceProviderAddress, serviceUrl } =
        info.row.original

      return (
        <ProviderOverview
          name={name}
          description={description}
          address={serviceProviderAddress}
          serviceUrl={serviceUrl}
        />
      )
    },
    sortingFn: 'alphanumeric',
  }),
  columnHelper.accessor('softwareVersion', {
    header: 'Version',
    cell: (info) => {
      const softwareVersion = info.getValue()
      return softwareVersion ? <SoftwareVersion info={softwareVersion} /> : '-'
    },
    sortingFn: sortSoftwareVersion,
    sortUndefined: 'last',
  }),
  columnHelper.accessor('checkActivityUrl', {
    header: 'Check Activity',
    cell: (info) => (
      <PdpScanLink
        pdpScanUrl={info.getValue()}
        providerName={info.row.original.name}
      />
    ),
    enableSorting: false,
  }),
  columnHelper.accessor('location', {
    header: 'Location',
    cell: (info) => info.getValue(),
    sortingFn: 'text',
    sortUndefined: 'last',
    filterFn: locationFilterFn,
  }),
  columnHelper.accessor('peerId', {
    id: 'peerId',
    header: 'Peer ID',
    cell: (info) => {
      const peerId = info.getValue()
      if (!peerId) return <span>-</span>
      return <CompactPeerID peerId={peerId} />
    },
    sortingFn: 'alphanumeric',
    sortUndefined: 'last',
  }),
]
