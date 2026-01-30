import { DownloadSimpleIcon } from '@phosphor-icons/react'
import { useMemo } from 'react'
import { CSVLink } from 'react-csv'

import type { ServiceProvider } from '@/schemas/provider-schema'

import { mapProviderToCsvRow } from '../utils/map-provider-to-csv-row'

type ExportToCsvLinkProps = {
  filteredProviders: Array<ServiceProvider>
}

export function ExportToCsvLink({ filteredProviders }: ExportToCsvLinkProps) {
  const csvFilename = `service-providers-${new Date().toISOString().split('T')[0]}.csv`

  const csvData = useMemo(() => {
    return filteredProviders.map((provider) =>
      mapProviderToCsvRow({ provider }),
    )
  }, [filteredProviders])

  return (
    <CSVLink
      aria-label="Export table data as CSV file"
      data={csvData}
      filename={csvFilename}
      className="button button--tertiary"
    >
      <span className="flex items-center gap-2 shrink-0">
        <DownloadSimpleIcon size={20} />
        <span className="whitespace-nowrap">Export CSV</span>
      </span>
    </CSVLink>
  )
}
