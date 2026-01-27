import { DownloadSimpleIcon } from '@phosphor-icons/react'
import { useCallback, useRef, useState } from 'react'
import { CSVLink } from 'react-csv'

import type { ServiceProvider } from '@/schemas/provider-schema'

import { mapProviderToCsvRow } from '../utils/map-provider-to-csv-row'

type ExportToCsvLinkProps = {
  filteredProviders: Array<ServiceProvider>
}

export function ExportToCsvLink({ filteredProviders }: ExportToCsvLinkProps) {
  const csvFilename = `service-providers-${new Date().toISOString().split('T')[0]}.csv`
  const [csvData, setCsvData] = useState<
    ReturnType<typeof mapProviderToCsvRow>[]
  >([])
  const providersRef = useRef(filteredProviders)

  const handleClick = useCallback(() => {
    const csvRows = providersRef.current.map((provider) =>
      mapProviderToCsvRow({ provider }),
    )
    setCsvData(csvRows)
  }, [])

  return (
    <CSVLink
      aria-label="Export table data as CSV file"
      className="focus:brand-outline"
      data={csvData}
      filename={csvFilename}
      onClick={handleClick}
    >
      <span className="flex items-center gap-2 shrink-0">
        <DownloadSimpleIcon size={20} />
        <span className="whitespace-nowrap md:flex hidden">Export CSV</span>
      </span>
    </CSVLink>
  )
}
