import {
  DEFAULT_SEARCH_QUERY,
  SEARCH_KEY,
} from '@filecoin-foundation/ui-filecoin/Search'
import { parseAsString, useQueryState } from 'nuqs'

export function useSearchQueryState() {
  const [searchQuery, setSearchQuery] = useQueryState(
    SEARCH_KEY,
    parseAsString
      .withDefault(DEFAULT_SEARCH_QUERY)
      .withOptions({ throttleMs: 300 }),
  )

  return {
    searchQuery,
    setSearchQuery,
    clearSearchQuery: () => setSearchQuery(null),
  } as const
}
