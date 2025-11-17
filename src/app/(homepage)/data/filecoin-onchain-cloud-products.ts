import type { SimpleCardWithImageProps } from '@/components/SimpleCardWithImage'

import { PATHS } from '@/constants/paths'
import { FIL_BEAM_URL, FOC_URLS } from '@/constants/site-metadata'
import aurora from '@/public/assets/aurora.webp'
import spaceStation from '@/public/assets/space-station.webp'
import spiralGalaxy from '@/public/assets/spiral-galaxy.webp'
import stellarExplosionNebula from '@/public/assets/stellar-explosion-nebula.webp'

const CTA_TEXT = 'Learn more'

export const filecoinOnchainCloudProducts: Array<SimpleCardWithImageProps> = [
  {
    title: 'Filecoin Warm Storage',
    description:
      'A storage layer that keeps data accessible while maintaining verifiable persistence across the Filecoin network. Powered by onchain contracts for storage and payments.',
    cta: {
      href: PATHS.WARM_STORAGE_SERVICE.path,
      text: CTA_TEXT,
    },
    image: {
      data: spaceStation,
      alt: "International Space Station illuminated by sunlight above Earth's horizon in space.",
    },
  },
  {
    title: 'Filecoin Pay',
    description:
      'Enables onchain payments tied to service delivery. Smart contracts automatically confirm performance before releasing funds — unlocking fair, pay-for-what-works models.',
    cta: {
      href: FOC_URLS.filecoinPay,
      text: CTA_TEXT,
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
      href: FIL_BEAM_URL,
      text: CTA_TEXT,
    },
    image: {
      data: aurora,
      alt: "View of colorful aurora over Earth's atmosphere seen from space with part of a spacecraft arm visible.",
    },
  },
  {
    title: 'Service Providers',
    description:
      'A global network of operators running Filecoin Onchain Cloud nodes delivering resilient, high-availability storage infrastructure.',
    cta: { href: PATHS.SERVICE_PROVIDERS.path, text: CTA_TEXT },
    image: {
      data: spiralGalaxy,
      alt: 'Bright spiral galaxy with glowing core and extended spiral arms filled with stars.',
    },
  },
] as const satisfies Array<SimpleCardWithImageProps>
