import { Button } from '@filecoin-foundation/ui-filecoin/Button'

import { useFilterQueryState } from '../hooks/useFilterQueryState'
import { useSearchQueryState } from '../hooks/useSearchQueryState'
import { useSortingQueryState } from '../hooks/useSortingQueryState'

export function ResetTableFilters() {
  const { clearFilterQueries } = useFilterQueryState()
  const { clearSearchQuery } = useSearchQueryState()
  const { clearSortQuery } = useSortingQueryState()

  const handleReset = () => {
    clearFilterQueries()
    clearSearchQuery()
    clearSortQuery()
  }

  return (
    <Button variant="tertiary" onClick={handleReset}>
      Reset Filters
    </Button>
  )
}
