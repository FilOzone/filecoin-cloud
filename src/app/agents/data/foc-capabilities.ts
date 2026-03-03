import type { CardData } from '@filecoin-foundation/ui-filecoin/Card'

export const focCapabilities = [
  {
    title: 'IPFS-compatible storage access',
    description:
      'Agents can write and retrieve content-addressed data using IPFS-compatible interfaces, enabling portable, composable, and decentralized storage across applications.',
  },
  {
    title: 'Onchain paid storage deals',
    description:
      'Storage agreements are enforced by smart contracts. Agents programmatically negotiate, pay for, and maintain long-term storage without human billing systems.',
  },
  {
    title: 'Retrieval payments',
    description:
      'Data access is programmable. Agents compensate providers for fast, reliable retrieval — enabling a performance-driven storage market.',
  },
  {
    title: 'Long-term verifiable memory',
    description:
      'Filecoin ensures data integrity over time through cryptographic proofs, enabling agents to maintain durable, audit-ready memory across years or decades.',
  },
] as const satisfies Array<CardData>
