// import { parseAbi } from 'viem'

export const WarmStorageABI = {
  legacy: [
    'function serviceProviderRegistry() view returns (address)',
    'function getProviderConfig(uint256) view returns (tuple(uint256 minPieceSize, uint256 maxPieceSize, uint256 pricingPerGB, bool isActive))',
    'function getServicePrice(uint8 tier) view returns (uint256)',
  ],

  current: [
    'function serviceProviderRegistry() view returns (address)',
    'function getServicePrice() view returns (tuple(uint256 pricePerTiBPerMonthNoCDN, uint256 pricePerTiBCdnEgress, uint256 pricePerTiBCacheMissEgress, address tokenAddress, uint256 epochsPerMonth, uint256 minimumPricePerMonth))',
  ],
}

export const StateViewABI = {
  legacy: [
    'function getApprovedProviders() view returns (uint256[])',
    'function isProviderApproved(uint256 providerId) view returns (bool)',
  ],

  current: [
    'function getApprovedProviders(uint256 offset, uint256 limit) view returns (uint256[])',
    'function getApprovedProvidersLength() view returns (uint256)',
    'function isProviderApproved(uint256 providerId) view returns (bool)',
  ],
}

export const ServiceRegistryABI = [
  'function getProvider(uint256 providerId) view returns (tuple(uint256 providerId, tuple(address serviceProvider, address payee, string name, string description, bool isActive) info))',
  'function getProductCapabilities(uint256 providerId, uint8 productType, string[] keys) view returns (bytes[])',
  'function getAllProductCapabilities(uint256 providerId, uint8 productType) view returns (bool isActive, string[] keys, bytes[] values)',
  'function getProviderWithProduct(uint256 providerId, uint8 productType) view returns (tuple(uint256 providerId, tuple(address serviceProvider, address payee, string name, string description, bool isActive) providerInfo, tuple(uint8 productType, string[] capabilityKeys, bool isActive) product, bytes[] productCapabilityValues))',
  'function isProviderActive(uint256 providerId) view returns (bool)',
  'function providerHasProduct(uint256 providerId, uint8 productType) view returns (bool)',
]
