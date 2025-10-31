import contracts from '../config/contracts.json'
import type {
  Network,
  NetworkConfig,
  VersionStatus,
} from '../types/contractType'

export const NETWORK_CONFIG: Record<Network, NetworkConfig> = Object.entries(
  contracts,
).reduce(
  (acc, [key, network]: [string, any]) => {
    acc[key as Network] = {
      name: network.name,
      rpcUrl: network.rpcUrl,
      explorerUrl: network.explorerUrl,
      versions: network.versions.map((v: any) => ({
        version: v.version,
        status: v.status as VersionStatus,
        isNew: v.isNew,
        linkToRelease: v.linkToRelease,
        contracts: {
          implementation: v.contracts.warmStorage.implementation,
          proxy: v.contracts.warmStorage.proxy,
          stateView: v.contracts.warmStorage.stateView,
          pdpVerifierImplementation:
            v.contracts.warmStorage.pdpVerifierImplementation,
          pdpVerifierProxy: v.contracts.warmStorage.pdpVerifierProxy,
        },
      })),
    }
    return acc
  },
  {} as Record<Network, NetworkConfig>,
)
