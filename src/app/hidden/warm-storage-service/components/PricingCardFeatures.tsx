import { Icon } from '@filecoin-foundation/filecoin-ui/Icon'
import { CheckIcon } from '@phosphor-icons/react/dist/ssr'

import type { PricingCardProps } from './PricingCard'

export type PricingCardFeaturesProps = {
  features: PricingCardProps['pricingFeatures']
}

export function PricingCardFeatures({ features }: PricingCardFeaturesProps) {
  return (
    <ul className="space-y-3">
      {features.map((feature) => (
        <li key={feature} className="flex items-center gap-2">
          <span className="text-brand-600">
            <Icon component={CheckIcon} color="inherit" size={16} />
          </span>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  )
}
