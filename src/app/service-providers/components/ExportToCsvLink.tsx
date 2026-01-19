import { DownloadSimpleIcon } from '@phosphor-icons/react'
import { CSVLink } from 'react-csv'

import type { mapProviderToCsvRow } from '../utils/map-provider-to-csv-row'

type ExportToCsvLinkProps = {
  csvData: ReturnType<typeof mapProviderToCsvRow>[]
}

export function ExportToCsvLink({ csvData }: ExportToCsvLinkProps) {
  const csvFilename = `service-providers-${new Date().toISOString().split('T')[0]}.csv`

  return (
    <CSVLink
      aria-label="Export table data as CSV file"
      className="focus:brand-outline"
      data={csvData}
      filename={csvFilename}
    >
      <span className="flex items-center gap-2 shrink-0">
        <DownloadSimpleIcon size={20} />
        <span className="whitespace-nowrap md:flex hidden">Export CSV</span>
      </span>
    </CSVLink>
  )
}
