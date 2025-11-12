export type PricingCardPriceProps =  {
  price: string
  priceUnit: string
  priceDescription: string
}

export function PricingCardPrice({ price, priceUnit, priceDescription }: PricingCardPriceProps) {
  return (
    <p className="space-y-3">
      <div className="space-x-2 font-medium">
        <span className="text-4xl">{price}</span>
        <span className="text-zinc-600">{priceUnit}</span>
      </div>
      <span className="text-zinc-600">{priceDescription}</span>
    </p>
  )
}
