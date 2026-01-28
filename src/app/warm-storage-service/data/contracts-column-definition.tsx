import { ExternalTextLink } from '@filecoin-foundation/ui-filecoin/TextLink/ExternalTextLink'
import { createColumnHelper } from '@tanstack/react-table'
import type { Address } from 'viem'

export type ContractInfo = {
  name: string
  address: Address
  explorerUrl: string
  sourceCodeUrl: string
}

const columnHelper = createColumnHelper<ContractInfo>()

export const contractsColumns = [
  columnHelper.accessor('name', {
    header: 'Contract Name',
    cell: (info) => <span className="font-medium">{info.getValue()}</span>,
    sortingFn: 'alphanumeric',
  }),
  columnHelper.accessor('address', {
    header: 'Contract Address',
    cell: (info) => {
      const address = info.getValue()
      const explorerUrl = info.row.original.explorerUrl
      return (
        <ExternalTextLink href={explorerUrl} className="font-mono text-sm">
          {address}
        </ExternalTextLink>
      )
    },
    sortingFn: 'alphanumeric',
  }),
  columnHelper.accessor('sourceCodeUrl', {
    header: 'Source Code',
    cell: (info) => {
      const url = info.getValue()
      return <ExternalTextLink href={url}>View on GitHub</ExternalTextLink>
    },
    enableSorting: false,
  }),
]
