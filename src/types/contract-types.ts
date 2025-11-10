import type { AbiParametersToPrimitiveTypes, ExtractAbiFunction } from 'abitype'

import type { ServiceRegistryABI } from '@/config/abis'

/**
 * Function types from ServiceRegistry ABI
 */
type GetProviderWithProductFn = ExtractAbiFunction<
  typeof ServiceRegistryABI,
  'getProviderWithProduct'
>

/**
 * Return types from ServiceRegistry functions using abitype
 */
export type GetProviderWithProductReturn = AbiParametersToPrimitiveTypes<
  GetProviderWithProductFn['outputs']
>[0]

/**
 * Nested types for convenience
 */
export type ProviderData = GetProviderWithProductReturn
