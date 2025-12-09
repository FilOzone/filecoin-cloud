export function toggleValueInArray(current: Array<string>, value: string) {
  return current.includes(value)
    ? current.filter((v) => v !== value)
    : [...current, value]
}
