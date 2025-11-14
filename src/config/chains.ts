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
  linkToRelease:
    'https://github.com/FilOzone/filecoin-services/releases/tag/v1.0.0',
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
      address: '0x8408502033C418E1bbC97cE9ac48E5528F371A9f',
      abi: WarmStorageABI,
    },
    warmStorageView: {
      address: '0x9e4e6699d8F67dFc883d6b0A7344Bd56F7E80B46',
      abi: WarmStorageViewABI,
    },
    serviceRegistry: {
      address: '0xf55dDbf63F1b55c3F1D4FA7e339a68AB7b64A5eB',
      abi: ServiceRegistryABI,
    },
  },
  contracts: {
    pdp: {
      implementation: '0xe2Dc211BffcA499761570E04e8143Be2BA66095f',
      proxy: '0xBADd0B92C1c71d02E7d520f64c0876538fa2557F',
    },
    warmStorage: {
      implementation: '0xd60b90f6D3C42B26a246E141ec701a20Dde2fA61',
      proxy: '0x8408502033C418E1bbC97cE9ac48E5528F371A9f',
      stateView: '0x9e4e6699d8F67dFc883d6b0A7344Bd56F7E80B46',
    },
    serviceProviderRegistry: {
      proxy: '0xf55dDbf63F1b55c3F1D4FA7e339a68AB7b64A5eB',
      implementation: '0xe255D3a89D6B326b48bc0fC94a472A839471D6B0',
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
  linkToRelease:
    'https://github.com/FilOzone/filecoin-services/releases/tag/v1.0.0',
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
    pdp: {
      implementation: '0x2355Cb19BA1eFF51673562E1a5fc5eE292AF9D42',
      proxy: '0x85e366Cf9DD2c0aE37E963d9556F5f4718d6417C',
    },
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
