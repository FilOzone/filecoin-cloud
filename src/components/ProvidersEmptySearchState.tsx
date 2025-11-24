import { EmptyStateCard } from '@filecoin-foundation/ui-filecoin/EmptyStateCard'
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr'

export function ProvidersEmptySearchState() {
  return (
    <EmptyStateCard
      icon={MagnifyingGlassIcon}
      title="No providers match your search"
      titleTag="h3"
      description="There are no providers available for this search query. Try updating your search terms."
    />
  )
}
