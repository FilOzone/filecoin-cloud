import { Badge } from '@filecoin-foundation/ui-filecoin/Badge'
import { Heading } from '@filecoin-foundation/ui-filecoin/Heading'

type PricingCardHeaderProps = {
  name: string
  description: string
  recommended: boolean
}

export function PricingCardHeader({
  name,
  description,
  recommended,
}: PricingCardHeaderProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col justify-between items-start gap-5 sm:flex-row sm:items-center">
        {recommended && (
          <span className="sm:order-2 sm:flex-row ">
            <Badge variant="primary">Recommended</Badge>
          </span>
        )}

        <Heading tag="h3" variant="card-heading">
          {name}
        </Heading>
      </div>
      <p title={description}>{description}</p>
    </div>
  )
}
