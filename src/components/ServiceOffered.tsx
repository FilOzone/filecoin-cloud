import { Badge } from '@filecoin-foundation/ui-filecoin/Badge'

import {
  getServiceTier,
  SERVICE_TIER_LABELS,
  ServiceTier,
} from '@/utils/service-tier'

type ServiceOfferedProps = {
  isActive: boolean
  isApproved: boolean
}

export function ServiceOffered({ isActive, isApproved }: ServiceOfferedProps) {
  const serviceTier = getServiceTier(isActive, isApproved)
  const labelTextTransform = 'none'

  if (serviceTier === ServiceTier.INACTIVE) {
    return (
      <div className="py-4 flex flex-col items-start">
        <Badge textTransform={labelTextTransform} variant="tertiary">
          {SERVICE_TIER_LABELS[ServiceTier.INACTIVE]}
        </Badge>
      </div>
    )
  }

  return (
    <div className="py-4 flex flex-col gap-2 items-start">
      {serviceTier === ServiceTier.WARM_AND_PDP && (
        <Badge textTransform={labelTextTransform} variant="secondary">
          {SERVICE_TIER_LABELS[ServiceTier.WARM_AND_PDP]}
        </Badge>
      )}
      <Badge textTransform={labelTextTransform}>
        {SERVICE_TIER_LABELS[ServiceTier.PDP_ONLY]}
      </Badge>
    </div>
  )
}
