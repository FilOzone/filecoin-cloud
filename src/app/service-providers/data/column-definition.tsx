import { ID } from '@filecoin-foundation/ui-filecoin/Table/ID'
import { YesNoStatus } from '@filecoin-foundation/ui-filecoin/Table/YesNoStatus'
// import { ExternalTextLink } from '@filecoin-foundation/ui-filecoin/TextLink/ExternalTextLink'
import { createColumnHelper } from '@tanstack/react-table'

import { CompactPeerID } from '@/components/CompactPeerID'
import { ProviderOverview } from '@/components/ProviderOverview'
import { ServiceOffered } from '@/components/ServiceOffered'
import { SoftwareVersion } from '@/components/SoftwareVersion'

import type { ServiceProvider } from '@/schemas/provider-schema'
import { sortServiceTier } from '@/utils/sort-service-tier'
import { sortSoftwareVersion } from '@/utils/sort-software-version'

import {
  capacityRangeFilterFn,
  ipniFilterFn,
  locationFilterFn,
  provingPeriodRangeFilterFn,
  serviceTierFilterFn,
  statusFilterFn,
} from '../utils/service-provider-filters'

const columnHelper = createColumnHelper<ServiceProvider>()

export const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (info) => <ID number={info.getValue()} />,
    sortingFn: 'basic',
  }),
  columnHelper.accessor((row) => row.name, {
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
    sortingFn: sortSoftwareVersion,
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
  columnHelper.accessor('isActive', {
    id: 'serviceOffered',
    header: 'Service Offered',
    cell: (info) => {
      const { isActive, isApproved } = info.row.original
      return <ServiceOffered isActive={isActive} isApproved={isApproved} />
    },
    sortingFn: sortServiceTier,
    filterFn: serviceTierFilterFn,
  }),
  columnHelper.accessor('serviceStatus', {
    header: 'Status',
    cell: (info) => {
      const serviceStatus = info.getValue() || '-'
      return serviceStatus.toUpperCase()
    },
    sortingFn: 'text',
    sortUndefined: 'last',
    filterFn: statusFilterFn,
  }),
  columnHelper.accessor('location', {
    header: 'Location',
    cell: (info) => info.getValue(),
    sortingFn: 'text',
    sortUndefined: 'last',
    filterFn: locationFilterFn,
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
    filterFn: capacityRangeFilterFn,
  }),
  columnHelper.accessor('minProvingPeriod', {
    header: 'Proving Period (Epochs)',
    cell: (info) => Number(info.getValue()).toLocaleString('en-US'),
    sortingFn: 'basic',
    sortUndefined: 'last',
    filterFn: provingPeriodRangeFilterFn,
  }),
  columnHelper.accessor('ipniIpfs', {
    header: 'IPNI',
    cell: (info) => {
      const isPublished = info.getValue()
      return <YesNoStatus status={isPublished ? 'yes' : 'no'} />
    },
    sortingFn: 'basic',
    filterFn: ipniFilterFn,
  }),
  columnHelper.accessor('peerId', {
    header: 'Peer ID',
    maxSize: 260,
    cell: (info) => {
      const peerId = info.getValue()
      if (!peerId) return <span>-</span>
      return <CompactPeerID peerId={peerId} />
    },
    sortingFn: 'alphanumeric',
    sortUndefined: 'last',
  }),
]
