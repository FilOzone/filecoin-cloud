import type { PricingCardProps } from '../components/PricingCard'

export const pricing = [
  {
    as: 'li',
    recommended: false,
    name: 'Basic Tier',
    description: 'Essential verifiable storage',
    price: '5',
    pricingFeatures: [
      'Store and retrieve from Filecoin SP',
      'Proof of Data Possession verification',
    ],
  },
  {
    as: 'li',
    recommended: true,
    name: 'Enhanced Tier',
    description: 'Fast retrieval using Filecoin Beam',
    price: '6',
    pricingFeatures: [
      'Everything in Basic Tier',
      'Data delivery layer w/ Filecoin Beam',
      'Fast content delivery',
      'Optimized for applications',
    ],
  },
] as const satisfies Array<PricingCardProps>
