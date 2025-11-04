import { ExternalTextLink } from '@filecoin-foundation/ui-filecoin/TextLink/ExternalTextLink'

type ProviderTableOverviewProps = {
  name: string
  description: string
  serviceUrl?: string
  softwareVersion?: string
}

const regex = /^(.+)_(.+)$/

export function ProviderTableOverview({
  name,
  description,
  serviceUrl,
  softwareVersion,
}: ProviderTableOverviewProps) {
  const match = softwareVersion?.match(regex)
  const [, version, lastUpdated] = match || []

  return (
    <div className="space-y-1.5 py-4">
      <div className="font-medium text-zinc-950">{name}</div>
      <div className="text-sm text-gray-600">{description}</div>
      <div className="text-sm">
        {serviceUrl && (
          <ExternalTextLink href={serviceUrl}>{serviceUrl}</ExternalTextLink>
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
