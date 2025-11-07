import { ExternalTextLink } from '@filecoin-foundation/ui-filecoin/TextLink/ExternalTextLink'

import { useNetwork } from '@/components/NetworkContext'

import { EXPLORERS } from '@/constants/externalServices'

type ProviderTableOverviewProps = {
  name: string
  description: string
  address: string
  serviceUrl?: string
  softwareVersion?: string
}

export function ProviderTableOverview({
  name,
  description,
  address,
  serviceUrl,
  softwareVersion,
}: ProviderTableOverviewProps) {
  const { network } = useNetwork()
  const explorerUrl = EXPLORERS.BLOCKSCOUT[network.id]

  const parsedSofwareData = parseSoftwareVersion(softwareVersion)

  return (
    <div className="space-y-1.5 py-4">
      <ExternalTextLink
        href={`${explorerUrl}${address}`}
        aria-label={`View provider ${name} on PDP Scan`}
      >
        <span className="font-medium">{name}</span>
      </ExternalTextLink>
      <div className="text-sm text-gray-600 truncate">{description}</div>
      <div className="text-sm">
        {serviceUrl && (
          <ExternalTextLink
            href={serviceUrl}
            aria-label={`Visit service URL for provider ${name}`}
          >
            {serviceUrl}
          </ExternalTextLink>
        )}
        {parsedSofwareData && (
          <div>
            <div className="text-gray-600">
              Version: {parsedSofwareData.version}
            </div>
            <div className="text-gray-600">
              Last Updated: {parsedSofwareData.lastUpdated}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function parseSoftwareVersion(
  softwareVersion: ProviderTableOverviewProps['softwareVersion'],
) {
  const emptyResult = { version: undefined, lastUpdated: undefined }
  const softwareVersionRegex = /^(.+)_(.+)$/

  if (!softwareVersion) return emptyResult

  const match = softwareVersion.match(softwareVersionRegex)

  if (!match) return emptyResult

  const [, version, lastUpdated] = match
  return { version, lastUpdated }
}
