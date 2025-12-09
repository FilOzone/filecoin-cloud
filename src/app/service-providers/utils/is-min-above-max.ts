export function isMinAboveMax(min: number | null, max: number | null) {
  if (min === null || max === null) return false
  return min > max
}
