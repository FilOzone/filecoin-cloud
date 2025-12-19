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
    date: 'Early 2026',
    title: 'Filecoin Onchain Cloud Live on Mainnet',
    description:
      'Launching on mainnet with programmable storage, retrieval, and onchain payments.',
    status: 'upcoming',
  },
  {
    date: 'Upcoming',
    title: 'Automate Repair and Replication',
    description:
      'Upcoming service contracts and replication layers will make storage self-healing and redundant.',
    status: 'upcoming',
  },
  {
    date: 'Upcoming',
    title: 'Bring Filecoin Onchain Cloud to Your Chain',
    description:
      'New payment and swapping end points will allow builders to pay in their native token and use Filecoin onchain verifiable storage.',
    status: 'upcoming',
  },
]
