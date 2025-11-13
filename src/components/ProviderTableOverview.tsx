import { ExternalTextLink } from '@filecoin-foundation/ui-filecoin/TextLink/ExternalTextLink'

import { useNetwork } from '@/components/NetworkContext'

import { EXPLORERS } from '@/constants/external-services'

type ProviderTableOverviewProps = {
  name: string
  description: string
  address: string
  serviceUrl: string
}

export function ProviderTableOverview({
  name,
  description,
  address,
  serviceUrl,
}: ProviderTableOverviewProps) {
  const { network } = useNetwork()
  const explorerUrl = EXPLORERS.BLOCKSCOUT[network]

  return (
    <div className="py-4">
      <ExternalTextLink
        href={`${explorerUrl}${address}`}
        aria-label={`View provider ${name} on PDP Scan`}
      >
        <span className="font-medium">{name}</span>
      </ExternalTextLink>
      <p className="text-sm text-gray-600 truncate pt-1">{description}</p>
      <ExternalTextLink
        href={serviceUrl}
        aria-label={`Visit service URL for provider ${name}`}
      >
        <span className="text-sm"> {serviceUrl}</span>
      </ExternalTextLink>
    </div>
  )
}
