export function parseBooleanCapability(value: string) {
  return value === 'true' || value === '\u0001' || value?.charCodeAt?.(0) === 1
}
