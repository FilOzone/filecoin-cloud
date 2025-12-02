import { ID } from '@filecoin-foundation/ui-filecoin/Table/ID'
import { PeerID } from '@filecoin-foundation/ui-filecoin/Table/PeerID'
// import { ExternalTextLink } from '@filecoin-foundation/ui-filecoin/TextLink/ExternalTextLink'
import { createColumnHelper } from '@tanstack/react-table'

import { ProviderOverview } from '@/components/ProviderOverview'
import { SoftwareVersion } from '@/components/SoftwareVersion'

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
  // TODO: Add check activity link
  // columnHelper.accessor('checkActivityUrl', {
  //   header: 'Check Activity',
  //   cell: (info) => (
  //     <ExternalTextLink href={info.getValue() || '#todo'}>
  //       View on PDP Scan
  //     </ExternalTextLink>
  //   ),
  // }),
  columnHelper.accessor('location', {
    header: 'Location',
    cell: (info) => info.getValue(),
    sortingFn: 'text',
    sortUndefined: 'last',
  }),
  columnHelper.accessor('peerId', {
    id: 'peerId',
    header: 'Peer ID',
    cell: (info) => <PeerID id={info.getValue() || '-'} />,
    sortingFn: 'alphanumeric',
    sortUndefined: 'last',
  }),
]
