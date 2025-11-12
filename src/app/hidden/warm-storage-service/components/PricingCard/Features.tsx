import { Icon } from '@filecoin-foundation/ui-filecoin/Icon'
import { CheckIcon } from '@phosphor-icons/react/dist/ssr'

export type FeaturesProps = {
  features: Array<string>
}

export function Features({ features }: FeaturesProps) {
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
