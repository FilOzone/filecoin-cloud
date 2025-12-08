import { EmptyStateCard } from '@filecoin-foundation/ui-filecoin/EmptyStateCard'
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr'

export function ProvidersEmptySearchState() {
  return (
    <EmptyStateCard
      icon={MagnifyingGlassIcon}
      title="No matching providers"
      titleTag="h3"
      description="Refine your search terms or filters to view more results."
    />
  )
}
