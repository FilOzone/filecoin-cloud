import type { CardData } from '@filecoin-foundation/ui-filecoin/Card'

import akaveCloudLogo from '@/public/assets/running-on-foc-section/akave-cloud-logo.webp'
import ensLogo from '@/public/assets/running-on-foc-section/ens-logo.webp'
import erc8004Logo from '@/public/assets/running-on-foc-section/erc-8004-logo.webp'
import filecoinPinLogo from '@/public/assets/running-on-foc-section/filecoin-pin-logo.webp'
import kyveLogo from '@/public/assets/running-on-foc-section/kyve-logo.webp'
import storachaLogo from '@/public/assets/running-on-foc-section/storacha-logo.webp'

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
    title: 'Akave Cloud',
    description:
      'Offers Filecoin Warm Storage and serves as a storage onramp for organizations with verifiable data needs.',
    image: {
      data: akaveCloudLogo,
      alt: 'Akave Cloud logo with a stylized font and star symbol on a space-themed background',
    },
  },
  {
    title: 'Storacha',
    description:
      'Delivers IPFS-compatible, high-throughput warm storage with UCAN-based programmable access control.',
    image: {
      data: storachaLogo,
      alt: 'Storacha logo in white rooster with a rocket flame, displayed on a cosmic background',
    },
  },
  {
    title: 'ERC-8004',
    description:
      'The trustless agent-builder community is using Filecoin Pin for onchain agent identity, reputation, and discovery.',
    image: {
      data: erc8004Logo,
      alt: 'ERC-8004 text logo on a starry background',
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
  {
    title: 'KYVE',
    description:
      'Resiliently stores chain data across a decentralized network of storage providers.',
    image: {
      data: kyveLogo,
      alt: 'KYVE text logo in bold white lettering on a space-themed background',
    },
  },
] as const satisfies Array<CardData>
