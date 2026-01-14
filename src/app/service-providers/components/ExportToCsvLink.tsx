import { DownloadSimpleIcon } from '@phosphor-icons/react'
import { CSVLink } from 'react-csv'

import type { mapProviderToCsvRow } from '../utils/map-provider-to-csv-row'

type ExportToCsvLinkProps = {
  csvData: ReturnType<typeof mapProviderToCsvRow>[]
  csvFilename: string
}

export function ExportToCsvLink({
  csvData,
  csvFilename,
}: ExportToCsvLinkProps) {
  return (
    <CSVLink
      aria-label="Export table data as CSV file"
      data={csvData}
      filename={csvFilename}
    >
      <span className="flex items-center gap-2">
        <DownloadSimpleIcon size={20} />
        Export CSV
      </span>
    </CSVLink>
  )
}
