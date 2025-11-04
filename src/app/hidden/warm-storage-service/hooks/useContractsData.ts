import { useMemo } from 'react'
import type { Address } from 'viem'

import type { ContractCardProps } from '../components/ContractCard'
import contracts from '../config/contracts.json'
import type { Network, WarmStorage } from '../types/contractType'

export function useContractsData(network: Network = 'calibration') {
  return useMemo(() => {
    const networkConfig = contracts[network]
    const activeVersion = networkConfig.versions.find(
      (v) => v.status === 'active',
    )

    if (!activeVersion?.contracts) {
      console.warn(`No active version found for network: ${network}`)
      return { contractsData: [] }
    }

    const { warmStorage, serviceProviderRegistry } = activeVersion.contracts
    const { explorerUrl } = networkConfig

    const warmStorageContracts = Object.entries(warmStorage)
      .filter((entry): entry is [keyof WarmStorage, Address] =>
        Boolean(entry[1]),
      )
      .map(([key, address]) =>
        formatContractForCard(
          formatContractLabel(key),
          address as Address,
          explorerUrl,
        ),
      )

    const serviceRegistryContracts = serviceProviderRegistry?.proxy
      ? [
          formatContractForCard(
            'Service Registry',
            serviceProviderRegistry.proxy as Address,
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
): ContractCardProps {
  return {
    label,
    address,
    href: `${explorerUrl}${address}`,
  }
}

function formatContractLabel(key: keyof WarmStorage) {
  const labelMap: Record<keyof WarmStorage, string> = {
    implementation: 'FWSS Implementation',
    proxy: 'FWSS Proxy',
    stateView: 'FWSS State View',
    pdpVerifierImplementation: 'PDP Verifier Implementation',
    pdpVerifierProxy: 'PDP Verifier Proxy',
  }

  return labelMap[key] ?? key.replace(/([A-Z])/g, ' $1').trim()
}
