import { EmptyStateCard } from '@filecoin-foundation/ui-filecoin/EmptyStateCard'
import { EmptyIcon } from '@phosphor-icons/react/dist/ssr'

export function ProvidersEmptyLoadingState() {
  return (
    <EmptyStateCard
      icon={EmptyIcon}
      title="No providers available"
      titleTag="h3"
      description="There are no providers available on this chain at this time."
    />
  )
}
