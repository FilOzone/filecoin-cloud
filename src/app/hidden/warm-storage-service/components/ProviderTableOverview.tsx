import { ExternalLink } from '@/components/ExternalLink'

import { EXPLORERS } from '@/constants/externalServices'

type ProviderTableOverviewProps = {
  name: string
  description: string
  address: string
  serviceUrl: string
  softwareVersion: string
}

const softwareVersionRegex = /^(.+)_(.+)$/

export function ProviderTableOverview({
  name,
  description,
  address,
  serviceUrl,
  softwareVersion,
}: ProviderTableOverviewProps) {
  const match = softwareVersion?.match(softwareVersionRegex)
  const [, version, lastUpdated] = match || []

  return (
    <div className="space-y-1.5 py-4">
      <ExternalLink
        href={`${EXPLORERS.PDP_SCAN.calibration}${address}`}
        className="text-brand-800 font-medium hover:underline"
        aria-label={`View provider ${name} on PDP Scan`}
      >
        {name}
      </ExternalLink>
      <div className="text-sm text-gray-600">{description}</div>
      <div className="text-sm">
        {serviceUrl && (
          <ExternalLink
            href={serviceUrl}
            className="text-brand-800 hover:underline"
            aria-label={`Visit service URL for provider ${name}`}
          >
            {serviceUrl}
          </ExternalLink>
        )}
        {softwareVersion && softwareVersion !== 'unknown' && (
          <div>
            <div className="text-gray-600">Version: {version}</div>
            <div className="text-gray-600">Last Updated: {lastUpdated}</div>
          </div>
        )}
      </div>
    </div>
  )
}
