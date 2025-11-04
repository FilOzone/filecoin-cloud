export function capabilitiesListToObject(
  keys: Array<string>,
  values: Array<string>,
) {
  const capabilities: Record<string, string> = {}
  for (let i = 0; i < keys.length; i++) {
    capabilities[keys[i]] = values[i]
  }
  return capabilities
}
