import { Icon } from '@filecoin-foundation/ui-filecoin/Icon'
import { CheckIcon } from '@phosphor-icons/react/dist/ssr'

import type { PricingCardProps } from './PricingCard'

export type PricingCardFeaturesProps = {
  features: PricingCardProps['pricingFeatures']
}

export function PricingCardFeatures({ features }: PricingCardFeaturesProps) {
  return (
    <ul className="space-y-2.5">
      {features.map((feature) => (
        <li key={feature}>
          <div className="flex items-center gap-2.5 text-brand-600">
            <Icon component={CheckIcon} color="inherit" size={16} />
            <span className="text-sm text-zinc-950">{feature}</span>
          </div>
        </li>
      ))}
    </ul>
  )
}
