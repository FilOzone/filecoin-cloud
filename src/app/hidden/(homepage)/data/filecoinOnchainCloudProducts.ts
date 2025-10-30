import type { SimpleCardData } from '@filecoin-foundation/ui-filecoin/SimpleCard'

export const filecoinOnchainCloudProducts = [
  {
    title: 'Service Providers',
    description:
      'A global network of operators running Filecoin Onchain Cloud nodes delivering resilient, high-availability storage infrastructure.',
    cta: { href: '#todo', text: 'Learn more' },
  },
  {
    title: 'Warm Storage',
    description:
      'A storage layer that keeps data accessible while maintaining verifiable persistence across the Filecoin network. Powered by onchain contracts for storage and payments.',
    cta: {
      href: '#todo',
      text: 'Learn more',
    },
  },
  {
    title: 'Filecoin Pay',
    description:
      'Enables onchain payments tied to service delivery. Smart contracts automatically confirm performance before releasing funds — unlocking fair, pay-for-what-works models.',
    cta: {
      href: '#todo',
      text: 'Learn more',
    },
  },
  {
    title: 'Filecoin Beam',
    description:
      'A retrieval service that connects onchain payments to verified data delivery. Uses an incentivized content network to ensure fast, accountable access across Filecoin.',
    cta: {
      href: '#todo',
      text: 'Learn more',
    },
  },
] as const satisfies Array<SimpleCardData>
