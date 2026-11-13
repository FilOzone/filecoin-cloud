import type { CardData } from '@filecoin-foundation/ui-filecoin/Card'
import {
  HardDrivesIcon,
  StorefrontIcon,
  VaultIcon,
} from '@phosphor-icons/react/dist/ssr'

export const coldStorageFeatures = [
  {
    title: 'PoRep-Sealed Durability',
    description:
      'Data is sealed at write time and proven onchain with Proof of Replication (PoRep) — built for maximum durability over years, not fast reads.',
    icon: VaultIcon,
  },
  {
    title: 'Built for Scale',
    description:
      'Designed for datasets of 1TiB and up, where cost per TiB matters more than retrieval speed.',
    icon: HardDrivesIcon,
  },
  {
    title: 'Marketplace Pricing',
    description:
      'Storage providers compete on price and durability in an open marketplace — no single vendor controls your archive.',
    icon: StorefrontIcon,
  },
] as const satisfies Array<CardData>
