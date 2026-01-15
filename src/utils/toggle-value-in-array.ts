export function toggleValueInArray<T>(current: Array<T>, value: T): Array<T> {
  return current.includes(value)
    ? current.filter((v) => v !== value)
    : [...current, value]
}
