/**
 * Provider service constants
 */

export const BATCH_SIZE = 100
export const PROVIDER_FETCH_LIMIT = 100
export const VERSION_FETCH_TIMEOUT = 5_000
export const VERSION_FETCH_CONCURRENCY = 20
export const PDP_PRODUCT_TYPE = 0

export const VERSION_PATTERN =
  /^\d+\.\d+\.\d+\+\w+\+git_[a-f0-9]+_\d{4}-\d{2}-\d{2}T[\d:+-]+$/
