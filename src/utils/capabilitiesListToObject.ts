export function capabilitiesListToObject(
  keys: readonly string[],
  values: readonly string[],
): Record<string, string> {
  const capabilities: Record<string, string> = {}
  for (let i = 0; i < keys.length; i++) {
    capabilities[keys[i]] = values[i]
  }
  return capabilities
}
