import {
  BUFFER_DAYS,
  COPIES,
  DAYS_PER_MONTH,
  USD_FLAT_PER_DATA_SET_MONTH,
  USD_LIFECYCLE_RESERVE_PER_DATA_SET,
  USD_PER_TIB_MONTH_PER_COPY,
} from '../constants/migration'

const BYTES_PER_TIB = 1024 ** 4
const BYTES_PER_TB = 1000 ** 4

/** Storage alone. This is the rate the comparison table quotes. */
export const USD_STORAGE_PER_TIB_MONTH = USD_PER_TIB_MONTH_PER_COPY * COPIES

/**
 * The comparison table quotes per-TB rates, because that is how pinning
 * services publish theirs. Warm storage is priced per TiB.
 */
export const USD_PER_TB_MONTH =
  USD_STORAGE_PER_TIB_MONTH * (BYTES_PER_TB / BYTES_PER_TIB)

/** One data set is created per copy, each holding its own lifecycle reserve. */
export const USD_LIFECYCLE_RESERVE = USD_LIFECYCLE_RESERVE_PER_DATA_SET * COPIES

/**
 * What actually gets charged, across every copy. The flat fee is per data set
 * and is added once, not multiplied by size: folding it into a per-TiB rate
 * happens to be exact at 1 TiB and wrong everywhere else, badly so below it.
 */
export function usdBurnPerMonth(tebibytes: number) {
  return (
    (tebibytes * USD_PER_TIB_MONTH_PER_COPY + USD_FLAT_PER_DATA_SET_MONTH) *
    COPIES
  )
}

export type VolumeUnit = 'GiB' | 'TiB'

export type CostEstimate = {
  tebibytes: number
  days: number
  /** Charges consumed over the funded period. This is the actual cost. */
  storage: number
  /** Held while the data is stored, returned when the data set is closed. */
  buffer: number
  /** Held per data set for lifecycle operations; the unused portion returns. */
  lifecycleReserve: number
  /** What you deposit up front. */
  deposit: number
  /** The portion of the deposit you get back. */
  refundable: number
}

export function toTebibytes(volume: number, unit: VolumeUnit) {
  return unit === 'TiB' ? volume : volume / 1024
}

export function estimateCost(tebibytes: number, days: number): CostEstimate {
  const perMonth = usdBurnPerMonth(tebibytes)
  const storage = perMonth * (days / DAYS_PER_MONTH)
  const buffer = perMonth * (BUFFER_DAYS / DAYS_PER_MONTH)
  const lifecycleReserve = USD_LIFECYCLE_RESERVE

  return {
    tebibytes,
    days,
    storage,
    buffer,
    lifecycleReserve,
    deposit: storage + buffer + lifecycleReserve,
    refundable: buffer + lifecycleReserve,
  }
}

export function formatUsd(amount: number) {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}
