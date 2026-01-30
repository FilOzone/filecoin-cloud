import type { Row, SortingFn } from '@tanstack/react-table'

import type { ServiceProvider } from '@/schemas/provider-schema'

import { getServiceTier } from './service-tier'

/**
 * Custom sorting function for service tier column
 * Sorts by service tier level: Warm & PDP > PDP Only > Inactive
 */
export const sortServiceTier: SortingFn<ServiceProvider> = (
  rowA: Row<ServiceProvider>,
  rowB: Row<ServiceProvider>,
) => {
  const tierA = getServiceTier(rowA.original.isActive, rowA.original.isApproved)
  const tierB = getServiceTier(rowB.original.isActive, rowB.original.isApproved)

  return tierA - tierB
}
