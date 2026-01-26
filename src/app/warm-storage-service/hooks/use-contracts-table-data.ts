import { useMemo } from 'react'

import { getChain, type Network } from '@/config/chains'
import { FOC_URLS } from '@/constants/site-metadata'

import type { ContractInfo } from '../data/contracts-column-definition'

export function useContractsTableData(network: Network = 'calibration') {
  return useMemo(() => {
    const chain = getChain(network)
    const { contracts } = chain
    const explorerUrl = chain.blockExplorers?.default?.url || ''

    const contractsData: ContractInfo[] = [
      {
        name: 'Warm Storage Proxy',
        address: contracts.warmStorage.proxy,
        explorerUrl: `${explorerUrl}/address/${contracts.warmStorage.proxy}`,
        sourceCodeUrl: `${FOC_URLS.warmStorageService.sourceCode}/FilecoinWarmStorageService.sol`,
      },
      {
        name: 'Warm Storage Implementation',
        address: contracts.warmStorage.implementation,
        explorerUrl: `${explorerUrl}/address/${contracts.warmStorage.implementation}`,
        sourceCodeUrl: FOC_URLS.warmStorageService.sourceCode,
      },
      {
        name: 'Warm Storage State View',
        address: contracts.warmStorage.stateView,
        explorerUrl: `${explorerUrl}/address/${contracts.warmStorage.stateView}`,
        sourceCodeUrl: FOC_URLS.warmStorageService.sourceCode,
      },
      {
        name: 'PDP Verifier Proxy',
        address: contracts.pdp.proxy,
        explorerUrl: `${explorerUrl}/address/${contracts.pdp.proxy}`,
        sourceCodeUrl: FOC_URLS.pdp.contractSourceCode,
      },
      {
        name: 'PDP Verifier Implementation',
        address: contracts.pdp.implementation,
        explorerUrl: `${explorerUrl}/address/${contracts.pdp.implementation}`,
        sourceCodeUrl: FOC_URLS.pdp.sourceCode,
      },
      {
        name: 'Service Provider Registry Proxy',
        address: contracts.serviceProviderRegistry.proxy,
        explorerUrl: `${explorerUrl}/address/${contracts.serviceProviderRegistry.proxy}`,
        sourceCodeUrl: FOC_URLS.warmStorageService.serviceProviderRegistryCode,
      },
      {
        name: 'Service Provider Registry Implementation',
        address: contracts.serviceProviderRegistry.implementation,
        explorerUrl: `${explorerUrl}/address/${contracts.serviceProviderRegistry.implementation}`,
        sourceCodeUrl: FOC_URLS.warmStorageService.serviceProviderRegistryCode,
      },
      {
        name: 'Filecoin Pay',
        address: contracts.payments.address,
        explorerUrl: `${explorerUrl}/address/${contracts.payments.address}`,
        sourceCodeUrl: FOC_URLS.payments.sourceCode,
      },
      {
        name: 'Session Key Registry',
        address: contracts.sessionKeyRegistry.address,
        explorerUrl: `${explorerUrl}/address/${contracts.sessionKeyRegistry.address}`,
        sourceCodeUrl: FOC_URLS.sessionKeyRegistry.sourceCode,
      },
      {
        name: 'Endorsement Set',
        address: contracts.endorsementSet.address,
        explorerUrl: `${explorerUrl}/address/${contracts.endorsementSet.address}`,
        sourceCodeUrl: FOC_URLS.warmStorageService.endorsementSetCode,
      },
    ]

    return { contractsData }
  }, [network])
}
