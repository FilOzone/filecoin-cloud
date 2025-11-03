import type { SimpleCardWithImageProps } from '@/components/SimpleCardWithImage'

import blackHole from '@/public/assets/back-hole.webp'
import nebulaEye from '@/public/assets/nebula-eye.webp'
import spaceTelescope from '@/public/assets/space-telescope.webp'
import sunSurface from '@/public/assets/sun-surface.webp'

export const filecoinOnchainCloudProducts = [
  {
    image: {
      data: spaceTelescope,
      alt: 'A stylized representation of a space telescope with a bright blue core and a series of dark spots representing stars.',
    },
    title: 'Service Providers',
    description:
      'A global network of operators running Filecoin Onchain Cloud nodes delivering resilient, high-availability storage infrastructure.',
    cta: { href: '/hidden/service-providers', text: 'Learn more' }, // TODO: Change link
  },
  {
    title: 'Warm Storage',
    description:
      'A storage layer that keeps data accessible while maintaining verifiable persistence across the Filecoin network. Powered by onchain contracts for storage and payments.',
    cta: {
      href: '/hidden/warm-storage-service', // TODO: Change link
      text: 'Learn more',
    },
    image: {
      data: nebulaEye,
      alt: 'A stylized representation of a nebula with a bright blue core and a series of dark spots representing stars.',
    },
  },
  {
    image: {
      data: blackHole,
      alt: 'An artistic depiction of a black hole with a bright orange accretion disk and a long arc of gas being pulled inward against a background of stars.',
    },
    title: 'Filecoin Pay',
    description:
      'Enables onchain payments tied to service delivery. Smart contracts automatically confirm performance before releasing funds — unlocking fair, pay-for-what-works models.',
    cta: {
      href: '/hidden/filecoin-pay-console', // TODO: Change link
      text: 'Learn more',
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
      data: sunSurface,
      alt: "A stylized representation of the sun's surface, with a bright yellow core and a series of dark spots representing sunspots.",
    },
  },
] as const satisfies Array<SimpleCardWithImageProps>
