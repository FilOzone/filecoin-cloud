'use client'

import type { ContractCardProps } from '../components/ContractCard'
import contracts from '../config/contracts.json'
import type { WarmStorage } from '../types/contractType'

export function useContractsData() {
  const activeVersion = contracts.calibration.versions.find(
    (v) => v.status === 'active',
  )

  if (!activeVersion?.contracts) {
    return { contractsData: [] }
  }

  const { warmStorage, serviceProviderRegistry } = activeVersion.contracts

  const { explorerUrl } = contracts.calibration

  const warmStorageContracts = Object.entries(warmStorage)
    .filter(([_, address]) => address)
    .map(([key, address]) =>
      createContractCard(
        formatContractLabel(key as keyof WarmStorage),
        address as string,
        explorerUrl,
      ),
    )

  const serviceRegistryProxy = serviceProviderRegistry?.proxy
    ? [
        createContractCard(
          'Service Registry',
          serviceProviderRegistry.proxy,
          explorerUrl,
        ),
      ]
    : []

  const contractsData = [...warmStorageContracts, ...serviceRegistryProxy]

  return { contractsData }
}

function createContractCard(
  label: string,
  address: string,
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

  return labelMap[key] ?? key
}
