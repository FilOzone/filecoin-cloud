export function parseNumericInput(value: string) {
  const parsed = value === '' ? null : Number.parseInt(value, 10)
  return Number.isNaN(parsed) ? null : parsed
}
