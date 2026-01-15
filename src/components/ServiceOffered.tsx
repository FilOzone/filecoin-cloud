import { Badge } from '@filecoin-foundation/ui-filecoin/Badge'

import { getServiceTier, ServiceTier } from '@/utils/service-tier'

type ServiceOfferedProps = {
  isActive: boolean
  isApproved: boolean
}

export function ServiceOffered({ isActive, isApproved }: ServiceOfferedProps) {
  const serviceTier = getServiceTier(isActive, isApproved)

  if (serviceTier === ServiceTier.INACTIVE) {
    return (
      <div className="py-4 flex flex-col items-start">
        <Badge variant="tertiary">Inactive</Badge>
      </div>
    )
  }

  return (
    <div className="py-4 flex flex-col gap-2 items-start">
      {serviceTier === ServiceTier.WARM_AND_PDP && (
        <Badge variant="secondary">Warm Storage</Badge>
      )}
      <Badge>PDP Storage</Badge>
    </div>
  )
}
