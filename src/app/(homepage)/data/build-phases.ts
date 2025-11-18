import type { PhaseProps } from '@/components/Phase'

export const buildPhases: Array<
  Pick<PhaseProps, 'date' | 'title' | 'description' | 'status'>
> = [
  {
    date: 'Oct 2025',
    title: 'Filecoin Pin',
    description:
      "Seamlessly stores content-addressed data using Filecoin's decentralized storage network.",
    status: 'completed',
  },
  {
    date: 'Nov 2025',
    title: 'Filecoin Onchain Cloud Testnet Launch',
    description:
      'Open, verifiable cloud platform delivering programmable storage, retrieval, and onchain payments for unstoppable decentralized applications.',
    status: 'current',
  },
  {
    date: 'Jan 2026',
    title: 'Filecoin Onchain Cloud Live on Mainnet',
    description:
      'Launching on mainnet with production-ready programmable storage, retrieval, and onchain payments.',
    status: 'upcoming',
  },
  {
    date: 'Q1 2026',
    title: 'Archival Storage',
    description:
      "Will connect Filecoin's Proof of Data Possession (PoRep)-based cold storage layer with warm storage, enabling data to move fluidly across hot, warm, and archival tiers within a single onchain stack.",
    status: 'upcoming',
  },
  {
    date: 'Upcoming',
    title: 'Automated Repair and Replication',
    description:
      'Upcoming service contracts and replication layers will make storage self-healing and redundant.',
    status: 'upcoming',
  },
  {
    date: 'Upcoming',
    title: 'Cross-chain Payments',
    description:
      'Filecoin Pay will support native tokens on different chains through cross-chain and x402-enabled transactions.',
    status: 'upcoming',
  },
  {
    date: 'Upcoming',
    title: 'Storage Provider Pools and Aggregation Markets',
    description:
      'Smaller nodes will be able to form pools, creating composite providers and expanding network resilience.',
    status: 'upcoming',
  },
]
