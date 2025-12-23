import { Badge } from '@filecoin-foundation/ui-filecoin/Badge'
import { Heading } from '@filecoin-foundation/ui-filecoin/Heading'
import { ExternalTextLink } from '@filecoin-foundation/ui-filecoin/TextLink/ExternalTextLink'

import { FIL_BEAM_URL, FOC_URLS } from '@/constants/site-metadata'

export function PricingCard() {
  return (
    <article className="relative flex h-full flex-col rounded-2xl border border-(--color-border-muted) sm:p-10 p-6 divide-y divide-(--color-border-muted)">
      <div className="space-y-10 pb-10">
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="w-fit sm:order-last">
              <Badge variant="primary">Limited time offer</Badge>
            </div>
            <div className="text-brand-800">
              <Heading tag="h3" variant="card-heading">
                Basic storage
              </Heading>
            </div>
          </div>

          <p className="text-(--color-paragraph-text)">
            Verifiable storage with{' '}
            <ExternalTextLink
              href={FOC_URLS.documentation.proofOfDataPossession}
            >
              Proof of Data Possession
            </ExternalTextLink>
          </p>
        </div>

        <div className="space-y-3">
          <div>
            <del className="text-4xl text-zinc-500">$5</del>{' '}
            <span className="text-4xl font-medium">$2.5</span>{' '}
            <span className="font-medium text-(--color-paragraph-text)">
              USDFC /TiB/month per copy
            </span>
          </div>

          <p className="text-(--color-paragraph-text)">
            Minimum of 2 copies stored using Filecoin Synapse SDK
          </p>
        </div>
      </div>

      <div className="space-y-10 pt-10">
        <div className="space-y-5">
          <Heading tag="h3" variant="card-heading">
            Add-on service
          </Heading>

          <p className="text-(--color-paragraph-text)">
            Fast content retrieval through{' '}
            <ExternalTextLink href={FIL_BEAM_URL}>
              Filecoin Beam's
            </ExternalTextLink>{' '}
            incentivized data delivery services
          </p>
        </div>

        <div className="space-y-3">
          <div>
            <span className="text-(--color-paragraph-text)">Up to</span>{' '}
            <span className="text-4xl font-medium">$0.014</span>{' '}
            <span className="text-(--color-paragraph-text)">
              USDFC / GiB egress
            </span>
          </div>

          <p className="text-(--color-paragraph-text)">
            Egress charged by Filecoin Beam
          </p>
        </div>
      </div>
    </article>
  )
}
