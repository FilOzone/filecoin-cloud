import type { CardData } from '@filecoin-foundation/ui-filecoin/Card'

import erc8004Image from '@/public/image-fallback.webp'
import filecoinPinImage from '@/public/image-fallback.webp'
import ensImage from '@/public/image-fallback.webp'
import akaveImage from '@/public/image-fallback.webp'

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
      'Lorem ipsum dolor sit amet consectetur. Pretium vel sagittis egestas purus. Viverra feugiat elit diam quisque a.',

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
