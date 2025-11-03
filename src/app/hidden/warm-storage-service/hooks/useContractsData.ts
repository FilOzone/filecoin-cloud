'use client'

import type { ContractCardProps } from '../components/ContractCard'
import { NETWORK_CONFIG } from '../data/networkConfig'
import type {
  ContractVersion,
  Network,
  NetworkConfig,
} from '../types/contractType'

function formatContractLabel(key: keyof ContractVersion['contracts']) {
  const labelMap: Record<keyof ContractVersion['contracts'], string> = {
    implementation: 'FWSS Implementation',
    proxy: 'FWSS Proxy',
    stateView: 'FWSS State View',
    pdpVerifierImplementation: 'FWSS PDP Verifier Implementation',
    pdpVerifierProxy: 'FWSS PDP Verifier Proxy',
  }

  return labelMap[key] ?? key
}

export function useContractsData() {
  const contractsData: Record<Network, NetworkConfig> = NETWORK_CONFIG
  const currentNetwork: NetworkConfig = contractsData.calibration

  const activeVersion = currentNetwork.versions.find(
    (version) => version.status === 'active',
  )

  const activeContracts: Array<ContractCardProps> = activeVersion?.contracts
    ? Object.entries(activeVersion.contracts)
        .filter(([_, address]) => address)
        .map(([key, address]) => ({
          label: formatContractLabel(key as keyof ContractVersion['contracts']),
          address: address,
          href: `${currentNetwork.explorerUrl}${address}`,
        }))
    : []

  return {
    currentNetwork,
    activeVersion,
    activeContracts,
  }
}
