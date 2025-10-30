import { cva, type VariantProps } from 'class-variance-authority'

import { PricingCardFeatures } from './PricingCardFeatures'
import { PricingCardHeader } from './PricingCardHeader'

const pricingCardStyles = cva(
  'focus-within:brand-outline relative flex h-full flex-col overflow-hidden rounded-2xl space-y-10 border p-10 focus-within:bg-zinc-50 border-(--color-border-muted) ',
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
  as: 'li' | 'div'
  recommended: boolean
  name: string
  description: string
  price: string
  pricingFeatures: Array<string>
} & VariantProps<typeof pricingCardStyles>

export function PricingCard({
  as: Tag,
  recommended,
  name,
  description,
  price,
  pricingFeatures,
}: PricingCardProps) {
  return (
    <Tag>
      <article className={pricingCardStyles({ recommended })}>
        <PricingCardHeader
          name={name}
          description={description}
          recommended={recommended}
        />

        <p title={price}>
          <span className="font-medium text-4xl">{price}</span> USDFC/TiB/month
        </p>

        <PricingCardFeatures features={pricingFeatures} />
      </article>
    </Tag>
  )
}
