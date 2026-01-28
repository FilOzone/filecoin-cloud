import { createParser } from 'nuqs'

import type { ServiceTier } from '@/utils/service-tier'

/**
 * Custom parser for ServiceTier that validates the integer is a valid ServiceTier value
 * Only accepts 0 (INACTIVE), 1 (PDP_ONLY), or 2 (WARM_AND_PDP)
 */
export const parseAsServiceTier = createParser({
  parse: (value) => {
    const num = Number.parseInt(value, 10)
    // Validate that the number is a valid ServiceTier (0, 1, or 2)
    if (Number.isNaN(num) || num < 0 || num > 2) {
      return null
    }
    return num as ServiceTier
  },
  serialize: (value) => String(value),
})
