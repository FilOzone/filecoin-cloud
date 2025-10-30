import { Icon } from '@filecoin-foundation/ui-filecoin/Icon'
import { CheckIcon } from '@phosphor-icons/react/dist/ssr'

export type PricingCardKeyFeatureProps = {
  feature: string
}

export function PricingCardKeyFeature({ feature }: PricingCardKeyFeatureProps) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon component={CheckIcon} color="success" size={16} />
      <span className="text-sm text-zinc-950">{feature}</span>
    </div>
  )
}
