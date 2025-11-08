import { Badge } from '@filecoin-foundation/filecoin-ui/Badge'
import { Heading } from '@filecoin-foundation/filecoin-ui/Heading'
import { clsx } from 'clsx'

import type { PricingCardProps } from './PricingCard'

type PricingCardHeaderProps = {
  name: PricingCardProps['name']
  description: PricingCardProps['description']
  recommended: PricingCardProps['recommended']
}

export function PricingCardHeader({
  name,
  description,
  recommended,
}: PricingCardHeaderProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col justify-between items-start gap-5 sm:flex-row sm:items-center">
        {recommended && (
          <span className="sm:order-2 sm:flex-row">
            <Badge variant="primary">Recommended</Badge>
          </span>
        )}

        <div className={clsx(recommended && 'text-brand-800')}>
          <Heading tag="h3" variant="card-heading">
            {name}
          </Heading>
        </div>
      </div>

      <p className="text-(--color-paragraph-text)">{description}</p>
    </div>
  )
}
