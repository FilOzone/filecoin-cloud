import { ID } from '@filecoin-foundation/ui-filecoin/Table/ID'
import { PeerID } from '@filecoin-foundation/ui-filecoin/Table/PeerID'
import { YesNoStatus } from '@filecoin-foundation/ui-filecoin/Table/YesNoStatus'
// import { ExternalTextLink } from '@filecoin-foundation/ui-filecoin/TextLink/ExternalTextLink'
import { createColumnHelper } from '@tanstack/react-table'

import { ProviderOverview } from '@/components/ProviderOverview'
import { SoftwareVersion } from '@/components/SoftwareVersion'

import type { ServiceProvider } from '@/schemas/provider-schema'

const columnHelper = createColumnHelper<ServiceProvider>()

export const columns = [
  columnHelper.accessor('id', {
    id: 'id',
    header: 'ID',
    cell: (info) => <ID number={info.getValue()} />,
    sortingFn: 'basic',
  }),
  columnHelper.accessor((row) => row.name, {
    id: 'provider',
    header: 'Provider',
    maxSize: 380,
    cell: (info) => {
      const row = info.row.original

      return (
        <ProviderOverview
          name={row.name}
          description={row.description}
          address={row.serviceProviderAddress}
          serviceUrl={row.serviceUrl}
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
    sortingFn: (rowA, rowB) => {
      const matchesA = rowA.original.softwareVersion?.split('+')
      const matchesB = rowB.original.softwareVersion?.split('+')
      if (!matchesA || !matchesB) return 0

      const versionA = matchesA[0]
      const versionB = matchesB[0]
      return versionA.localeCompare(versionB)
    },
    sortUndefined: 'last',
  }),
  // TODO: Add check activity link
  // columnHelper.accessor('checkActivityUrl', {
  //   header: 'Check Activity',
  //   cell: (info) => (
  //     <ExternalTextLink href={info.getValue() || '#todo'}>
  //       View on PDP Scan
  //     </ExternalTextLink>
  //   ),
  // }),
  // TODO: Add Service Offered Column
  columnHelper.accessor('serviceStatus', {
    header: 'Status',
    cell: (info) => {
      const serviceStatus = info.getValue() || '-'
      return serviceStatus.toUpperCase()
    },
    sortingFn: 'alphanumeric',
    sortUndefined: 'last',
  }),
  columnHelper.accessor('location', {
    id: 'location',
    header: 'Location',
    cell: (info) => info.getValue(),
    sortingFn: 'alphanumeric',
    sortUndefined: 'last',
  }),
  columnHelper.accessor('capacityTb', {
    header: 'Capacity (TiB)',
    cell: (info) => {
      const capacity = info.getValue()
      if (!capacity) return '-'
      return Number(capacity).toLocaleString('en-US')
    },
    sortingFn: 'basic',
    sortUndefined: 'last',
  }),
  columnHelper.accessor('minProvingPeriod', {
    header: 'Proving Period (Epochs)',
    cell: (info) => Number(info.getValue()).toLocaleString('en-US'),
    sortingFn: 'basic',
    sortUndefined: 'last',
  }),
  columnHelper.accessor('ipniIpfs', {
    header: 'IPNI',
    cell: (info) => {
      const isPublished = info.getValue()
      return <YesNoStatus status={isPublished ? 'yes' : 'no'} />
    },
    sortingFn: 'basic',
  }),
  columnHelper.accessor('peerId', {
    header: 'Peer ID',
    cell: (info) => <PeerID id={info.getValue() || '-'} />,
    sortingFn: 'alphanumeric',
  }),
]
