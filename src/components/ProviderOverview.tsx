'use client'

import { useNetwork } from '@filecoin-foundation/ui-filecoin/Network/useNetwork'
import { ExternalTextLink } from '@filecoin-foundation/ui-filecoin/TextLink/ExternalTextLink'

import { EXPLORERS } from '@/constants/external-services'
import { getNetworkId } from '@/utils/get-network-id'
import { isValidUrl } from '@/utils/is-valid-url'

type ProviderOverviewProps = {
  name: string
  description: string
  address: string
  serviceUrl: string
}

export function ProviderOverview({
  name,
  description,
  address,
  serviceUrl,
}: ProviderOverviewProps) {
  const [network] = useNetwork()
  const networkId = getNetworkId(network)
  const explorerUrl = EXPLORERS.BLOCKSCOUT[networkId]

  const isServiceUrlValid = isValidUrl(serviceUrl)

  return (
    <div className="py-4">
      <ExternalTextLink
        href={`${explorerUrl}${address}`}
        aria-label={`View provider ${name} on PDP Scan`}
      >
        <span className="font-medium">{name}</span>
      </ExternalTextLink>

      <p className="truncate pt-1 text-sm text-gray-600">{description}</p>
      {isServiceUrlValid ? (
        <ExternalTextLink
          href={serviceUrl}
          aria-label={`Visit service URL for provider ${name}`}
        >
          <span className="text-sm">{serviceUrl}</span>
        </ExternalTextLink>
      ) : (
        <span className="text-sm">{serviceUrl}</span>
      )}
    </div>
  )
}
