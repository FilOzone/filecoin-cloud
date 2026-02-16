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
    status: 'completed',
  },
  {
    date: 'Live',
    title: 'Mainnet',
    description:
      '2 independent replicas across separate storage providers. PDP proofs verify data on-chain every 24 hours. Payments halt automatically if proofs stop.',
    status: 'current',
  },
  {
    date: 'Post-GA',
    title: 'Automated Repair',
    description:
      'Fault-triggered re-replication from healthy copies without manual intervention. Recovery time drops from hours to minutes.',
    status: 'upcoming',
  },
  {
    date: 'Future',
    title: 'Durable Backups',
    description:
      'Sealed backup copies alongside hot replicas for defense-in-depth durability.',
    status: 'upcoming',
  },
]
