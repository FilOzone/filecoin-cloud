import type { CardData } from '@filecoin-foundation/ui-filecoin/Card'

import akaveLogo from '@/public/akave-logo.webp'
import ensLogo from '@/public/ens-logo.webp'
import erc8004Logo from '@/public/erc8004-logo.webp'
import filecoinPinLogo from '@/public/filecoinpin-logo.webp'

export const runningOnFilecoinOnchainCloud = [
  {
    title: 'Filecoin Pin',
    description:
      'Makes Interplanetary File System (IPFS) content easy to persist, keep online, and verify — simple tools, familiar workflows.',
    image: {
      data: filecoinPinLogo,
      alt: 'Filecoin Pin logo on a cosmic background',
    },
  },
  {
    title: 'Akave',
    description:
      'Offers Filecoin Warm Storage and serves as a storage onramp for organizations with verifiable data needs.',
    image: {
      data: akaveLogo,
      alt: 'Akave logo with a stylized font and star symbol on a space-themed background',
    },
  },
  {
    title: 'ERC8004',
    description:
      'Uses verifiable storage on Filecoin Onchain Cloud to persist and prove AI agent activity — creating transparent, tamper-proof audit logs.',
    image: {
      data: erc8004Logo,
      alt: 'ERC8004 text logo on a starry background',
    },
  },
  {
    title: 'ENS',
    description:
      'Store and verify ENS metadata and content, ensuring decentralized domains remain live, verifiable, and tamper-proof.',
    image: {
      data: ensLogo,
      alt: 'ENS (Ethereum Name Service) logo on a galaxy background',
    },
  },
] as const satisfies Array<CardData>
