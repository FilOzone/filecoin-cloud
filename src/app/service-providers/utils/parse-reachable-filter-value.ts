import { createParser } from 'nuqs'

import type { ReachableFilterValue } from '../hooks/use-filter-query-state'

export const parseAsReachableFilterValue = createParser({
  parse: (value) => {
    if (value === 'true' || value === 'false') {
      return value as ReachableFilterValue
    }
    return null
  },
  serialize: (value) => value,
})
