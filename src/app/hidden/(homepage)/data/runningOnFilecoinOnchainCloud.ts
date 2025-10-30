import type { CardData } from '@filecoin-foundation/ui-filecoin/Card'

import {
  default as akaveImage,
  default as ensImage,
  default as erc8004Image,
  default as filecoinPinImage,
} from '@/public/image-fallback.webp'

export const runningOnFilecoinOnchainCloud = [
  {
    title: 'Filecoin Pin',
    description:
      'Makes Interplanetary File System (IPFS) content easy to persist, keep online, and verify — simple tools, familiar workflows.',
    image: {
      data: filecoinPinImage,
      alt: 'Filecoin Pin project card showing IPFS integration',
    },
  },
  {
    title: 'Akave',
    description:
      'Offers Filecoin Warm Storage and serves as a storage onramp for organizations with verifiable data needs.',
    image: {
      data: akaveImage,
      alt: 'Akave project visualization',
    },
  },
  {
    title: 'ERC8004',
    description:
      'Uses verifiable storage on Filecoin Onchain Cloud to persist and prove AI agent activity — creating transparent, tamper-proof audit logs.',
    image: {
      data: erc8004Image,
      alt: 'ERC8004 AI agent activity verification',
    },
  },
  {
    title: 'ENS',
    description:
      'Store and verify ENS metadata and content, ensuring decentralized domains remain live, verifiable, and tamper-proof.',
    image: {
      data: ensImage,
      alt: 'ENS domain storage and verification',
    },
  },
] as const satisfies Array<CardData>
