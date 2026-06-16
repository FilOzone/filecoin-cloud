import { ID } from '@filecoin-foundation/ui-filecoin/Table/ID'
import { YesNoStatus } from '@filecoin-foundation/ui-filecoin/Table/YesNoStatus'
import { createColumnHelper } from '@tanstack/react-table'

import { CellLoadingSpinner } from '@/components/CellLoadingSpinner'
import { CompactPeerID } from '@/components/compact-peer-id'
import { PdpScanLink } from '@/components/PdpScanLink'
import { ProviderOverview } from '@/components/ProviderOverview'
import { ProviderReachability } from '@/components/ProviderReachability'
import { ServiceOffered } from '@/components/ServiceOffered'
import { SoftwareVersion } from '@/components/SoftwareVersion'

import type { ServiceProviderRow } from '@/schemas/provider-schema'
import { sortReachability } from '@/utils/sort-reachability'
import { sortServiceTier } from '@/utils/sort-service-tier'
import { sortSoftwareVersion } from '@/utils/sort-software-version'

import {
  capacityRangeFilterFn,
  ipniFilterFn,
  locationFilterFn,
  reachableFilterFn,
  serviceTierFilterFn,
} from '../utils/service-provider-filters'

const columnHelper = createColumnHelper<ServiceProviderRow>()

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
          isEndorsed={row.isEndorsed}
        />
      )
    },
    sortingFn: 'alphanumeric',
  }),
  columnHelper.accessor('softwareVersion', {
    header: 'Version',
    cell: (info) => {
      const softwareVersion = info.getValue()
      if (softwareVersion) return <SoftwareVersion info={softwareVersion} />
      // Probe still running: show a spinner instead of an empty value.
      if (info.row.original.runtimeStatus === 'pending') {
        return <CellLoadingSpinner />
      }
      return '-'
    },
    sortingFn: sortSoftwareVersion,
    sortUndefined: 'last',
  }),
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
  columnHelper.accessor('reachable', {
    id: 'reachable',
    header: 'Reachability',
    cell: (info) => {
      const { runtimeStatus, reachable, latencyMs } = info.row.original
      return (
        <ProviderReachability
          status={runtimeStatus}
          reachable={reachable}
          latencyMs={latencyMs}
        />
      )
    },
    sortingFn: sortReachability,
    filterFn: reachableFilterFn,
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
