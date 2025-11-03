'use client'

import { useMemo } from 'react'
import type { Address } from 'viem'

import type { ContractCardProps } from '../components/ContractCard'
import contracts from '../config/contracts.json'
import type { WarmStorage } from '../types/contractType'

export function useContractsData(
  network: keyof typeof contracts = 'calibration',
) {
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
      .filter((entry): entry is [keyof WarmStorage, string] =>
        Boolean(entry[1]),
      )
      .map(([key, address]) =>
        createContractCard(
          formatContractLabel(key),
          address as Address,
          explorerUrl,
        ),
      )

    const serviceRegistryContracts = serviceProviderRegistry?.proxy
      ? [
          createContractCard(
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

function createContractCard(
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
  }

  return labelMap[key] ?? key.replace(/([A-Z])/g, ' $1').trim()
}
