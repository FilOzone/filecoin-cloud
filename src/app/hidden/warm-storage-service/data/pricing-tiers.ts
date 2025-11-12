import type { PricingCardProps } from '../components/PricingCard'

export const pricingTiers = [
  {
    name: 'Basic Storage',
    description: 'Verifiable storage with Proof of Data Possession',
    priceInfo: [{
      price: '2.5',
      priceUnit: 'USDFC/TiB/month',
      priceDescription: 'Minimum monthly charge: 0.06 USDFC (covers up to ~24 GiB)',
    }],
    pricingFeatures: [
      'Pay-as-you-store pricing model',
      'Only pay when PDP is verified onchain',
      'Store and retrieve from Filecoin service providers',
      'Continuous proof of data possession'
    ],
    recommended: false,
  },
  {
    name: 'Filecoin Beam Egress Package',
    description: 'Fast content delivery with CDN acceleration',
    priceInfo: [{
      price: '7.0',
      priceUnit: 'USDFC /TiB egress',
      priceDescription: 'CDN egress charged by Filecoin Beam',
    },{
      price: '7.0',
      priceUnit: 'USDFC /TiB',
      priceDescription: 'Cache miss egress paid to service providers (when Filecoin Beam fetches from origin)',
    } ],
    pricingFeatures: [
      'Fast content delivery',
      'Optimized for applications',
      'Global CDN distribution',
      'Low latency data access',
    ],
    recommended: true,
  },
] as const satisfies Array<PricingCardProps>
