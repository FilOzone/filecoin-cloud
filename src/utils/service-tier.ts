/**
 * Service tier levels for providers
 * Higher number = more services offered
 */
export enum ServiceTier {
  INACTIVE = 0,
  PDP_ONLY = 1,
  WARM_AND_PDP = 2,
}

/**
 * Human-readable labels for service tiers
 */
export const SERVICE_TIER_LABELS: Record<ServiceTier, string> = {
  [ServiceTier.WARM_AND_PDP]: 'Warm Storage',
  [ServiceTier.PDP_ONLY]: 'PDP Storage',
  [ServiceTier.INACTIVE]: 'Inactive',
}

/**
 * Determines the service tier based on provider status
 *
 * @param isActive - Whether the provider is active
 * @param isApproved - Whether the provider is FWSS approved
 * @returns The service tier level
 */
export function getServiceTier(
  isActive: boolean,
  isApproved: boolean,
): ServiceTier {
  if (!isActive) {
    return ServiceTier.INACTIVE
  }

  if (isApproved) {
    return ServiceTier.WARM_AND_PDP
  }

  return ServiceTier.PDP_ONLY
}
