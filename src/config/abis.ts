export const WARM_STORAGE_ABI_LEGACY = [
  'function serviceProviderRegistry() view returns (address)',
  'function getProviderConfig(uint256) view returns (tuple(uint256 minPieceSize, uint256 maxPieceSize, uint256 pricingPerGB, bool isActive))',
  'function getServicePrice(uint8 tier) view returns (uint256)',
]

export const WARM_STORAGE_ABI = [
  'function serviceProviderRegistry() view returns (address)',
  'function getServicePrice() view returns (tuple(uint256 pricePerTiBPerMonthNoCDN, uint256 pricePerTiBCdnEgress, uint256 pricePerTiBCacheMissEgress, address tokenAddress, uint256 epochsPerMonth, uint256 minimumPricePerMonth))',
]

export const WARM_STORAGE_STATE_VIEW_ABI = [
  'function getApprovedProviders(uint256 offset, uint256 limit) view returns (uint256[])',
  'function getApprovedProvidersLength() view returns (uint256)',
  'function isProviderApproved(uint256 providerId) view returns (bool)',
]

export const WARM_STORAGE_STATE_VIEW_ABI_LEGACY = [
  'function getApprovedProviders() view returns (uint256[])',
  'function isProviderApproved(uint256 providerId) view returns (bool)',
]

export const SERVICE_REGISTRY_ABI = [
  'function getProvider(uint256 providerId) view returns (tuple(uint256 providerId, tuple(address serviceProvider, address payee, string name, string description, bool isActive) info))',
  'function getProductCapabilities(uint256 providerId, uint8 productType, string[] keys) view returns (bytes[])',
  'function getAllProductCapabilities(uint256 providerId, uint8 productType) view returns (bool isActive, string[] keys, bytes[] values)',
  'function getProviderWithProduct(uint256 providerId, uint8 productType) view returns (tuple(uint256 providerId, tuple(address serviceProvider, address payee, string name, string description, bool isActive) providerInfo, tuple(uint8 productType, string[] capabilityKeys, bool isActive) product, bytes[] productCapabilityValues))',
  'function isProviderActive(uint256 providerId) view returns (bool)',
  'function providerHasProduct(uint256 providerId, uint8 productType) view returns (bool)',
]
