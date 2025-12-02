import type { Row } from '@tanstack/react-table'

import type { ServiceProvider } from '@/schemas/provider-schema'

export function sortSoftwareVersion(
  rowA: Row<ServiceProvider>,
  rowB: Row<ServiceProvider>,
) {
  const matchesA = rowA.original.softwareVersion?.split('+')
  const matchesB = rowB.original.softwareVersion?.split('+')

  if (!matchesA || !matchesB) return 0

  const versionA = matchesA[0]
  const versionB = matchesB[0]

  return versionA.localeCompare(versionB)
}
