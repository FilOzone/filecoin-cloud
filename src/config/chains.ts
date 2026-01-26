import type { Address, ChainContract, Chain as ViemChain } from 'viem'

import { ServiceRegistryABI, WarmStorageABI, WarmStorageViewABI } from './abis'
import deployments from './deployments'

export type UpgradableContract = {
  implementation: Address
  proxy: Address
}

export type WarmStorage = UpgradableContract & {
  stateView: Address
}

export type Contracts = {
  pdp: UpgradableContract
  warmStorage: WarmStorage
  serviceProviderRegistry: UpgradableContract
  payments: ChainContract
  sessionKeyRegistry: ChainContract
  endorsementSet: ChainContract
}

/**
 * Viem compatible chain interface with WarmStorage and ServiceRegistry contracts
 */
export interface Chain extends ViemChain {
  contractsWithAbi: {
    warmStorage: {
      address: Address
      abi: typeof WarmStorageABI
    }
    warmStorageView: {
      address: Address
      abi: typeof WarmStorageViewABI
    }
    serviceRegistry: {
      address: Address
      abi: typeof ServiceRegistryABI
    }
  }
  contracts: Contracts
  linkToRelease?: string
}

// Contract addresses from deployments.json
const mainnetAddresses = deployments['314']
const calibrationAddresses = deployments['314159']

const mainnet: Chain = {
  id: 314,
  name: 'Filecoin - Mainnet',
  nativeCurrency: {
    name: 'Filecoin',
    symbol: 'FIL',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://filecoin.chain.love/'],
      webSocket: ['wss://wss.node.glif.io/apigw/lotus/rpc/v1'],
    },
  },
  linkToRelease:
    'https://github.com/FilOzone/filecoin-services/releases/tag/v1.0.0',
  blockExplorers: {
    Beryx: {
      name: 'Beryx',
      url: 'https://beryx.io/fil/mainnet',
    },
    Filfox: {
      name: 'Filfox',
      url: 'https://filfox.info/en',
    },
    Glif: {
      name: 'Glif',
      url: 'https://www.glif.io/en',
    },
    default: {
      name: 'Blockscout',
      url: 'https://filecoin.blockscout.com',
    },
  },
  contractsWithAbi: {
    warmStorage: {
      address: mainnetAddresses.FWSS_PROXY_ADDRESS,
      abi: WarmStorageABI,
    },
    warmStorageView: {
      address: mainnetAddresses.FWSS_VIEW_ADDRESS,
      abi: WarmStorageViewABI,
    },
    serviceRegistry: {
      address: mainnetAddresses.SERVICE_PROVIDER_REGISTRY_PROXY_ADDRESS,
      abi: ServiceRegistryABI,
    },
  },
  contracts: {
    pdp: {
      implementation: mainnetAddresses.PDP_VERIFIER_IMPLEMENTATION_ADDRESS,
      proxy: mainnetAddresses.PDP_VERIFIER_PROXY_ADDRESS,
    },
    warmStorage: {
      implementation: mainnetAddresses.FWSS_IMPLEMENTATION_ADDRESS,
      proxy: mainnetAddresses.FWSS_PROXY_ADDRESS,
      stateView: mainnetAddresses.FWSS_VIEW_ADDRESS,
    },
    serviceProviderRegistry: {
      proxy: mainnetAddresses.SERVICE_PROVIDER_REGISTRY_PROXY_ADDRESS,
      implementation:
        mainnetAddresses.SERVICE_PROVIDER_REGISTRY_IMPLEMENTATION_ADDRESS,
    },
    payments: { address: mainnetAddresses.FILECOIN_PAY_ADDRESS },
    sessionKeyRegistry: {
      address: mainnetAddresses.SESSION_KEY_REGISTRY_ADDRESS,
    },
    endorsementSet: {
      address: mainnetAddresses.ENDORSEMENT_SET_ADDRESS,
    },
  },
}

export const calibration: Chain = {
  id: 314_159,
  name: 'Filecoin - Calibration testnet',
  nativeCurrency: {
    name: 'Filecoin',
    symbol: 'tFIL',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://api.calibration.node.glif.io/'],
      webSocket: ['wss://wss.calibration.node.glif.io/apigw/lotus/rpc/v1'],
    },
  },
  linkToRelease:
    'https://github.com/FilOzone/filecoin-services/releases/tag/v1.0.0',
  blockExplorers: {
    Beryx: {
      name: 'Beryx',
      url: 'https://beryx.io/fil/calibration',
    },
    Filfox: {
      name: 'Filfox',
      url: 'https://calibration.filfox.info/en',
    },
    Glif: {
      name: 'Glif',
      url: 'https://www.glif.io/en?chain=314159',
    },
    default: {
      name: 'Blockscout',
      url: 'https://filecoin-testnet.blockscout.com',
    },
  },
  contractsWithAbi: {
    warmStorage: {
      address: calibrationAddresses.FWSS_PROXY_ADDRESS,
      abi: WarmStorageABI,
    },
    warmStorageView: {
      address: calibrationAddresses.FWSS_VIEW_ADDRESS,
      abi: WarmStorageViewABI,
    },
    serviceRegistry: {
      address: calibrationAddresses.SERVICE_PROVIDER_REGISTRY_PROXY_ADDRESS,
      abi: ServiceRegistryABI,
    },
  },
  contracts: {
    pdp: {
      implementation: calibrationAddresses.PDP_VERIFIER_IMPLEMENTATION_ADDRESS,
      proxy: calibrationAddresses.PDP_VERIFIER_PROXY_ADDRESS,
    },
    warmStorage: {
      implementation: calibrationAddresses.FWSS_IMPLEMENTATION_ADDRESS,
      proxy: calibrationAddresses.FWSS_PROXY_ADDRESS,
      stateView: calibrationAddresses.FWSS_VIEW_ADDRESS,
    },
    serviceProviderRegistry: {
      proxy: calibrationAddresses.SERVICE_PROVIDER_REGISTRY_PROXY_ADDRESS,
      implementation:
        calibrationAddresses.SERVICE_PROVIDER_REGISTRY_IMPLEMENTATION_ADDRESS,
    },
    payments: { address: calibrationAddresses.FILECOIN_PAY_ADDRESS },
    sessionKeyRegistry: {
      address: calibrationAddresses.SESSION_KEY_REGISTRY_ADDRESS,
    },
    endorsementSet: {
      address: calibrationAddresses.ENDORSEMENT_SET_ADDRESS,
    },
  },
}

export type Network = 'calibration' | 'mainnet'

/**
 * Get a chain by network name
 * @param network - The network name. Defaults to calibration.
 */
export function getChain(network: Network = 'calibration'): Chain {
  switch (network) {
    case 'mainnet':
      return mainnet
    case 'calibration':
      return calibration
    default:
      throw new Error(`Chain with network ${network} not found`)
  }
}
