import { cva, type VariantProps } from 'class-variance-authority'

import { PricingCardFeatures } from './PricingCardFeatures'
import { PricingCardHeader } from './PricingCardHeader'
import { PricingCardPrice, PricingCardPriceProps } from './PricingCardPrice'

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
  priceInfo: Array<PricingCardPriceProps>
  pricingFeatures: Array<string>
  recommended: boolean
} & VariantProps<typeof pricingCardStyles>

export function PricingCard({
  name,
  description,
  priceInfo,
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
      {priceInfo.map(({ price, priceUnit, priceDescription }) => (
        <PricingCardPrice key={`${price}-${priceUnit}`} price={price} priceUnit={priceUnit} priceDescription={priceDescription} />
      ))}
      <PricingCardFeatures features={pricingFeatures} />
    </article>
  )
}
