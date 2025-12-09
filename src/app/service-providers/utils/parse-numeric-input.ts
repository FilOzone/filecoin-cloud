export function parseNumericInput(value: string) {
  const trimmed = value.trim()
  const parsed = trimmed === '' ? null : Number.parseInt(trimmed, 10)
  return Number.isNaN(parsed) ? null : parsed
}
