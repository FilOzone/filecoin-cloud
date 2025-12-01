export function parseNumericInput(value: string) {
  const parsed = value === '' ? null : Number(value)
  return Number.isNaN(parsed) ? null : parsed
}
