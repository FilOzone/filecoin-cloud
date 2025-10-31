import type { PricingCardProps } from '../components/PricingCard'

export const pricingTiers = [
  {
    name: 'Basic Tier',
    description: 'Essential verifiable storage',
    price: '5',
    pricingFeatures: [
      'Store and retrieve from Filecoin SP',
      'Proof of Data Possession verification',
    ],
    recommended: false,
  },
  {
    name: 'Enhanced Tier',
    description: 'Fast retrieval using Filecoin Beam',
    price: '6',
    pricingFeatures: [
      'Everything in Basic Tier',
      'Data delivery layer with Filecoin Beam',
      'Fast content delivery',
      'Optimized for applications',
    ],
    recommended: true,
  },
] as const satisfies Array<PricingCardProps>
