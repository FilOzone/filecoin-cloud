import { cva, type VariantProps } from 'class-variance-authority'

import { PricingCardFeatures } from './PricingCardFeatures'
import { PricingCardHeader } from './PricingCardHeader'

const pricingCardStyles = cva(
  'relative flex h-full flex-col overflow-hidden rounded-2xl space-y-10 border p-10 border-(--color-border-muted)',
  {
    variants: {
      recommended: {
        true: 'shadow-[0_4px_20px_0_rgba(0,0,0,0.1)]',
        false: 'bg-zinc-50',
      },
    },
    defaultVariants: {
      recommended: false,
    },
  },
)

export type PricingCardProps = {
  name: string
  description: string
  price: string
  pricingFeatures: Array<string>
  recommended: boolean
} & VariantProps<typeof pricingCardStyles>

export function PricingCard({
  name,
  description,
  price,
  pricingFeatures,
  recommended,
}: PricingCardProps) {
  return (
    <article className={pricingCardStyles({ recommended })}>
      <PricingCardHeader
        name={name}
        description={description}
        recommended={recommended}
      />

      <p>
        <span className="font-medium text-4xl">{price}</span>{' '}
        <span className="text-zinc-600"> USDFC/TiB/month</span>
      </p>

      <PricingCardFeatures features={pricingFeatures} />
    </article>
  )
}
