import { Heading } from '@filecoin-foundation/ui-filecoin/Heading'

type PricingCardSectionProps = {
  title: string
  children: React.ReactNode
}

export function PricingCardSection({
  title,
  children,
}: PricingCardSectionProps) {
  return (
    <div className="space-y-4">
      <Heading tag="h4" className="font-medium">
        {title}
      </Heading>
      {children}
    </div>
  )
}
