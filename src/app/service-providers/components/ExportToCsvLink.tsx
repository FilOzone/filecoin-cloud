import { DownloadSimpleIcon } from '@phosphor-icons/react'
import { CSVLink } from 'react-csv'

import type { mapProviderToCsvRow } from '../utils/mapProviderToCsvRow'

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
      data={csvData}
      filename={csvFilename}
      className="flex items-center gap-2"
    >
      <span className="flex items-center gap-2">
        <DownloadSimpleIcon size={20} />
        Export CSV
      </span>
    </CSVLink>
  )
}
