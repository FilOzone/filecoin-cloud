import { cva, type VariantProps } from 'class-variance-authority'

import { Features, type FeaturesProps } from './Features'
import { Header, type HeaderProps } from './Header'
import { PriceItem, type PriceItemProps } from './PriceItem'

export type PricingCardProps = {
  name: HeaderProps['name']
  description: HeaderProps['description']
  prices: Array<PriceItemProps>
  features: FeaturesProps['features']
  recommended: boolean
} & VariantProps<typeof pricingCardStyles>

export function PricingCard({
  name,
  description,
  prices,
  features,
  recommended,
}: PricingCardProps) {
  return (
    <article className={pricingCardStyles({ recommended })}>
      <Header name={name} description={description} recommended={recommended} />

      {prices.map(({ amount, unit, description }) => (
        <PriceItem
          key={`${amount}-${unit}-${description}`}
          amount={amount}
          unit={unit}
          description={description}
        />
      ))}

      <Features features={features} />
    </article>
  )
}

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
