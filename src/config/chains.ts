import type { Address, Chain as ViemChain } from 'viem'

import { ServiceRegistryABI, WarmStorageABI, WarmStorageViewABI } from './abis'

export type Contract = {
  implementation: string
  proxy: string
}

export type WarmStorage = {
  implementation: string
  proxy: string
  stateView: string
}

export type Contracts = {
  pdp?: Partial<Contract>
  warmStorage: WarmStorage
  serviceProviderRegistry: Contract
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
      http: ['https://api.node.glif.io/rpc/v1'],
      webSocket: ['wss://wss.node.glif.io/apigw/lotus/rpc/v1'],
    },
  },
  linkToRelease: '',
  blockExplorers: {
    Beryx: {
      name: 'Beryx',
      url: 'https://beryx.io/fil/mainnet',
    },
    Filfox: {
      name: 'Filfox',
      url: 'https://filfox.info',
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
      address: '0x81DFD9813aDd354f03704F31419b0c6268d46232',
      abi: WarmStorageABI,
    },
    warmStorageView: {
      address: '0x1f4B10FFf972Cd429e4007ac2c77fC9e2315ca2f',
      abi: WarmStorageViewABI,
    },
    serviceRegistry: {
      address: '0x93b48FeEB7fF9a6D4d745c9EE28Bfa129E6E6676',
      abi: ServiceRegistryABI,
    },
  },
  contracts: {
    pdp: {
      implementation: '0x839823b96f68f368F349Bab72068ABCB08AE5B6d',
      proxy: '0x1790d465d1FABE85b530B116f385091d52a12a3b',
    },
    warmStorage: {
      implementation: '0x5Bf32A0f947B5731E991E1054748487623f40FEc',
      proxy: '0x81DFD9813aDd354f03704F31419b0c6268d46232',
      stateView: '0x1f4B10FFf972Cd429e4007ac2c77fC9e2315ca2f',
    },
    serviceProviderRegistry: {
      proxy: '0x93b48FeEB7fF9a6D4d745c9EE28Bfa129E6E6676',
      implementation: '0x4A57d833A62E9146F86f70408D9E64515849B003',
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
      http: ['https://api.calibration.node.glif.io/rpc/v1'],
      webSocket: ['wss://wss.calibration.node.glif.io/apigw/lotus/rpc/v1'],
    },
  },
  blockExplorers: {
    Beryx: {
      name: 'Beryx',
      url: 'https://beryx.io/fil/calibration',
    },
    Filfox: {
      name: 'Filfox',
      url: 'https://calibration.filfox.info',
    },
    Glif: {
      name: 'Glif',
      url: 'https://www.glif.io/en/calibrationnet',
    },
    default: {
      name: 'Blockscout',
      url: 'https://filecoin-testnet.blockscout.com',
    },
  },
  contractsWithAbi: {
    warmStorage: {
      address: '0x02925630df557F957f70E112bA06e50965417CA0',
      abi: WarmStorageABI,
    },
    warmStorageView: {
      address: '0xA5D87b04086B1d591026cCE10255351B5AA4689B',
      abi: WarmStorageViewABI,
    },
    serviceRegistry: {
      address: '0x839e5c9988e4e9977d40708d0094103c0839Ac9D',
      abi: ServiceRegistryABI,
    },
  },
  contracts: {
    pdp: {},
    warmStorage: {
      implementation: '0x4BCc752555Bf08A5Bd9a4Ce467a12607277450bA',
      proxy: '0x02925630df557F957f70E112bA06e50965417CA0',
      stateView: '0xA5D87b04086B1d591026cCE10255351B5AA4689B',
    },
    serviceProviderRegistry: {
      proxy: '0x839e5c9988e4e9977d40708d0094103c0839Ac9D',
      implementation: '0xb32Bb530638d20f1B59B40CDD2Ce4208430f7DE3',
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
