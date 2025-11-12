export type PriceItemProps = {
  amount: string
  unit: string
  description: string
}

export function PriceItem({ amount, unit, description }: PriceItemProps) {
  return (
    <div className="space-y-3">
      <div className="space-x-2 font-medium">
        <span className="text-4xl">{amount}</span>
        <span className="text-zinc-600">{unit}</span>
      </div>
      <span className="text-zinc-600">{description}</span>
    </div>
  )
}
