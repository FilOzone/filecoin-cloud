import { ExternalTextLink } from '@filecoin-foundation/ui-filecoin/TextLink/ExternalTextLink'

type PdpScanLinkProps = {
  pdpScanUrl: string
  providerName: string
}

export function PdpScanLink({ pdpScanUrl, providerName }: PdpScanLinkProps) {
  return (
    <ExternalTextLink
      href={pdpScanUrl}
      aria-label={`View activity for provider ${providerName} on PDP Scan`}
    >
      View on PDP Scan
    </ExternalTextLink>
  )
}
