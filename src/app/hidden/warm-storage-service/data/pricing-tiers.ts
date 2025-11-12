import type { PricingCardProps } from '../components/PricingCard/PricingCard'

export const pricingTiers: Array<PricingCardProps> = [
  {
    name: 'Basic Storage',
    description: 'Verifiable storage with Proof of Data Possession',
    prices: [
      {
        amount: '2.5',
        unit: 'USDFC/TiB/month',
        description:
          'Minimum monthly charge: 0.06 USDFC (covers up to ~24 GiB)',
      },
    ],
    features: [
      'Pay-as-you-store pricing model',
      'Only pay when PDP is verified onchain',
      'Store and retrieve from Filecoin service providers',
      'Continuous proof of data possession',
    ],
    recommended: false,
  },
  {
    name: 'Filecoin Beam Egress Package',
    description: 'Fast content delivery with CDN acceleration',
    prices: [
      {
        amount: '7.0',
        unit: 'USDFC /TiB egress',
        description: 'CDN egress charged by Filecoin Beam',
      },
      {
        amount: '7.0',
        unit: 'USDFC /TiB',
        description:
          'Cache miss egress paid to service providers (when Filecoin Beam fetches from origin)',
      },
    ],
    features: [
      'Fast content delivery',
      'Optimized for applications',
      'Global CDN distribution',
      'Low latency data access',
    ],
    recommended: true,
  },
] as const satisfies Array<PricingCardProps>
