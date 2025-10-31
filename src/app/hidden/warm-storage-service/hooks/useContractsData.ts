'use client'

import type { ContractCardProps } from '../components/ContractCard'
import { NETWORK_CONFIG } from '../data/networkConfig'
import type { Network, NetworkConfig } from '../types/contractType'

function formatContractLabel(key: string): string {
  const labelMap: Record<string, string> = {
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
          label: formatContractLabel(key),
          address: address,
        }))
    : []

  return {
    currentNetwork,
    activeVersion,
    activeContracts,
  }
}
