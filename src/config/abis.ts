import { parseAbi } from 'viem'

export const WarmStorageABI = parseAbi([
  'function serviceProviderRegistry() view returns (address)',
  'function getServicePrice() view returns ((uint256 pricePerTiBPerMonthNoCDN, uint256 pricePerTiBCdnEgress, uint256 pricePerTiBCacheMissEgress, address tokenAddress, uint256 epochsPerMonth, uint256 minimumPricePerMonth))',
])

export const WarmStorageViewABI = parseAbi([
  'function getApprovedProviders(uint256 offset, uint256 limit) view returns (uint256[])',
  'function getApprovedProvidersLength() view returns (uint256)',
  'function isProviderApproved(uint256 providerId) view returns (bool)',
])

export const ServiceRegistryABI = parseAbi([
  'function getProvider(uint256 providerId) view returns ((uint256 providerId, (address serviceProvider, address payee, string name, string description, bool isActive) info))',
  'function getProductCapabilities(uint256 providerId, uint8 productType, string[] keys) view returns (bytes[])',
  'function getAllProductCapabilities(uint256 providerId, uint8 productType) view returns (bool isActive, string[] keys, bytes[] values)',
  'function getProviderWithProduct(uint256 providerId, uint8 productType) view returns ((uint256 providerId, (address serviceProvider, address payee, string name, string description, bool isActive) providerInfo, (uint8 productType, string[] capabilityKeys, bool isActive) product, bytes[] productCapabilityValues))',
  'function getProvidersByProductType(uint8 productType, bool onlyActive, uint256 offset, uint256 limit) external view returns (((uint256 providerId, (address serviceProvider, address payee, string name, string description, bool isActive) providerInfo, (uint8 productType, string[] capabilityKeys, bool isActive) product, bytes[] productCapabilityValues)[] providers, bool hasMore))',
  'function isProviderActive(uint256 providerId) view returns (bool)',
  'function providerHasProduct(uint256 providerId, uint8 productType) view returns (bool)',
  'function getProviderCount() external view returns (uint256)',
])
