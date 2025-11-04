export type Network = 'calibration' | 'mainnet'
export type VersionStatus = 'active' | 'inactive' | 'testing'

export type ContractVersion = {
  version: string
  status: VersionStatus
  isNew?: boolean
  linkToRelease?: string
  contracts: Contracts
}

export type ServiceProviderRegistry = {
  proxy: string
  implementation: string
}

export type WarmStorage = {
  implementation: string
  proxy: string
  stateView: string
  pdpVerifierImplementation?: string
  pdpVerifierProxy?: string
}

export type NetworkConfig = {
  name: string
  rpcUrl: string
  explorerUrl: string
  versions: ContractVersion[]
}

export type Contracts = {
  warmStorage: WarmStorage
  serviceProviderRegistry: ServiceProviderRegistry
}
