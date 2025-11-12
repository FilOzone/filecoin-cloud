import type { SimpleCardWithImageProps } from '@/components/SimpleCardWithImage'

import aurora from '@/public/assets/aurora.webp'
import spaceStation from '@/public/assets/space-station.webp'
import spiralGalaxy from '@/public/assets/spiral-galaxy.webp'
import stellarExplosionNebula from '@/public/assets/stellar-explosion-nebula.webp'

export const filecoinOnchainCloudProducts = [
  {
    title: 'Filecoin Warm Storage',
    description:
      'A storage layer that keeps data accessible while maintaining verifiable persistence across the Filecoin network. Powered by onchain contracts for storage and payments.',
    cta: {
      href: '/hidden/warm-storage-service', // TODO: Change link
      text: 'Learn more',
    },
    image: {
      data: spaceStation,
      alt: 'International Space Station illuminated by sunlight above Earth’s horizon in space.',
    },
  },
  {
    title: 'Filecoin Pay',
    description:
      'Enables onchain payments tied to service delivery. Smart contracts automatically confirm performance before releasing funds — unlocking fair, pay-for-what-works models.',
    cta: {
      href: '/hidden/filecoin-pay-console', // TODO: Change link
      text: 'Learn more',
    },
    image: {
      data: stellarExplosionNebula,
      alt: 'Colorful nebula resembling a cross-shaped stellar explosion surrounded by glowing gas and dust.',
    },
  },
  {
    title: 'Filecoin Beam',
    description:
      'A retrieval service that connects onchain payments to verified data delivery. Uses an incentivized content network to ensure fast, accountable access across Filecoin.',
    cta: {
      href: 'https://filbeam.com/',
      text: 'Learn more',
    },
    image: {
      data: aurora,
      alt: "View of colorful aurora over Earth’s atmosphere seen from space with part of a spacecraft arm visible.",
    },
  },
  {
    title: 'Service Providers',
    description:
      'A global network of operators running Filecoin Onchain Cloud nodes delivering resilient, high-availability storage infrastructure.',
    cta: { href: '/hidden/service-providers', text: 'Learn more' }, // TODO: Change link
    image: {
      data: spiralGalaxy,
      alt: 'Bright spiral galaxy with glowing core and extended spiral arms filled with stars.',
    },
  },



] as const satisfies Array<SimpleCardWithImageProps>
