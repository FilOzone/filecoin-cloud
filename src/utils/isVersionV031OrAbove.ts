export function isVersionV031OrAbove(version: string): boolean {
  const match = version.match(/v?(\d+)\.(\d+)\.(\d+)/)
  if (!match) return false

  const [, major, minor, patch] = match.map(Number)

  if (major > 0) return true
  if (major === 0 && minor > 3) return true
  if (major === 0 && minor === 3 && patch >= 1) return true

  return false
}
