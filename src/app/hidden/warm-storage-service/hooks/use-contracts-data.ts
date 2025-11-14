import { useMemo } from 'react'
import type { Address } from 'viem'

import { getChain, type Network, type WarmStorage } from '@/config/chains'

export function useContractsData(network: Network = 'calibration') {
  return useMemo(() => {
    const chain = getChain(network)
    const { contracts } = chain
    const explorerUrl = chain.blockExplorers?.default?.url || ''

    const warmStorageContracts = Object.entries(contracts.warmStorage).map(
      ([key, address]) =>
        formatContractForCard(
          formatContractLabel(key as keyof WarmStorage),
          address as Address,
          explorerUrl,
        ),
    )

    const serviceRegistryContracts = contracts.serviceProviderRegistry?.proxy
      ? [
          formatContractForCard(
            'Service Registry',
            contracts.serviceProviderRegistry.proxy as Address,
            explorerUrl,
          ),
        ]
      : []

    return {
      contractsData: [...warmStorageContracts, ...serviceRegistryContracts],
    }
  }, [network])
}

function formatContractForCard(
  label: string,
  address: Address,
  explorerUrl: string,
) {
  return {
    label,
    address,
    href: `${explorerUrl.replace(/\/$/, '')}/address/${address}`,
  }
}

function formatContractLabel(key: keyof WarmStorage) {
  const labelMap: Record<keyof WarmStorage, string> = {
    implementation: 'FWSS Implementation',
    proxy: 'FWSS Proxy',
    stateView: 'FWSS State View',
  }

  return labelMap[key] ?? key.replace(/([A-Z])/g, ' $1').trim()
}
