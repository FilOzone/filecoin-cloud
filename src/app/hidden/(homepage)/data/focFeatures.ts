import type { CardData } from '@filecoin-foundation/ui-filecoin/Card'
import { CodeIcon, GlobeIcon, WalletIcon } from '@phosphor-icons/react/dist/ssr'

export const focFeatures = [
  {
    title: 'Build dApps with Filecoin Onchain Cloud',
    description: 'Easily deploy dApps with warm, verifiable storage.',
    icon: CodeIcon,
  },
  {
    title: 'Work with global service providers',
    description: 'Tap into a network built for open, resilient infrastructure.',
    icon: GlobeIcon,
  },
  {
    title: 'Pay only when its proven',
    description:
      'Unified wallet with automatic onchain payments for verified delivery.',
    icon: WalletIcon,
  },
] as const satisfies Array<CardData>
