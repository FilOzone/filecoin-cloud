export function isMinAboveMax(min: number | null, max: number | null) {
  if (min === null || max === null) return false
  if (min === max) return false

  return min > max
}
