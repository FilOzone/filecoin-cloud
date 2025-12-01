export function toggleValueInArray(current: Array<string>, value: string) {
  const updated = current.includes(value)
    ? current.filter((v) => v !== value)
    : [...current, value]

  return updated
}
