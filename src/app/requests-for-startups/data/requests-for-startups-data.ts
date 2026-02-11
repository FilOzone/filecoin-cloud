import type { SimpleCardData } from '@filecoin-foundation/ui-filecoin/SimpleCard'

import { PATHS } from '@/constants/paths'

const CTA_TEXT = 'View details'

export type RequestForStartup = SimpleCardData & {
  id: string
}

export const requestsForStartups = [
  {
    id: 'RFS-1',
    title: 'Agent Storage SDK & Wallet Primitives',
    description:
      'Build the foundational storage toolkit that any AI agent can use to store data on Filecoin autonomously — including SDKs, wallet abstractions, and drop-in backend adapters.',
    cta: {
      href: `${PATHS.REQUESTS_FOR_STARTUPS.path}/rfs-1-agent-storage-sdk-wallet-primitives`,
      text: CTA_TEXT,
    },
  },
  {
    id: 'RFS-2',
    title: 'Onchain Agent Registry with Filecoin-Backed State',
    description:
      'Deploy AI agents as first-class onchain citizens — individually registered, discoverable, and addressable onchain, with persistent state and execution logs stored on Filecoin.',
    cta: {
      href: `${PATHS.REQUESTS_FOR_STARTUPS.path}/rfs-2-onchain-agent-registry-with-filecoin-backed-state`,
      text: CTA_TEXT,
    },
  },
  {
    id: 'RFS-3',
    title: 'Agent Reputation & Portable Identity',
    description:
      'A long-lived, tamper-resistant reputation system for AI agents where behavioral history is anchored to Filecoin and identities persist across runtimes, platforms, and chains.',
    cta: {
      href: `${PATHS.REQUESTS_FOR_STARTUPS.path}/rfs-3-agent-reputation-portable-identity`,
      text: CTA_TEXT,
    },
  },
  {
    id: 'RFS-4',
    title: 'Autonomous Agent Economy Testbed',
    description:
      'A bounded onchain environment where AI agents operate under real economic constraints — funding their own storage, paying for infrastructure, and surviving based on their ability to manage value.',
    cta: {
      href: `${PATHS.REQUESTS_FOR_STARTUPS.path}/rfs-4-autonomous-agent-economy-testbed`,
      text: CTA_TEXT,
    },
  },
  {
    id: 'RFS-5',
    title: 'Fee-Gated Agent Communication Protocol',
    description:
      'A secure, peer-to-peer communication layer for AI agents where messages are exchanged directly, fees are enforced onchain, and all communication is durably archived on Filecoin.',
    cta: {
      href: `${PATHS.REQUESTS_FOR_STARTUPS.path}/rfs-5-fee-gated-agent-communication-protocol`,
      text: CTA_TEXT,
    },
  },
  {
    id: 'RFS-6',
    title: 'Autonomous Infrastructure Brokerage',
    description:
      'An agent-native procurement layer where agents negotiate, compare, and procure storage on behalf of other agents — autonomous GTM for decentralized infrastructure.',
    cta: {
      href: `${PATHS.REQUESTS_FOR_STARTUPS.path}/rfs-6-autonomous-infrastructure-brokerage`,
      text: CTA_TEXT,
    },
  },
  {
    id: 'RFS-7',
    title: 'Agent-Generated Data Marketplace',
    description:
      'A marketplace where AI agents produce, price, list, and sell datasets or derived intelligence — all stored on Filecoin and settled onchain.',
    cta: {
      href: `${PATHS.REQUESTS_FOR_STARTUPS.path}/rfs-7-agent-generated-data-marketplace`,
      text: CTA_TEXT,
    },
  },
] as const satisfies Array<RequestForStartup>
