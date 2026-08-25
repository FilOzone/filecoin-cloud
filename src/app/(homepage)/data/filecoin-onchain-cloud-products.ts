import type { SimpleCardWithImageProps } from '@/components/SimpleCardWithImage'

import { PATHS } from '@/constants/paths'
import { FIL_BEAM_URL, FOC_URLS } from '@/constants/site-metadata'
import aurora from '@/public/assets/aurora.webp'
import spaceStation from '@/public/assets/space-station.webp'
import stellarExplosionNebula from '@/public/assets/stellar-explosion-nebula.webp'

const CTA_TEXT = 'Learn more'

export const filecoinOnchainCloudProducts: Array<SimpleCardWithImageProps> = [
  {
    title: 'Storage Marketplace',
    description:
      'Warm storage for active data and cold storage for large archives, both verified onchain and settled through Filecoin Pay. Compare Filecoin Warm Storage and Filecoin Cold Storage and pick the fit for your data.',
    cta: {
      href: PATHS.STORE.path,
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
      'The payment rail underneath every service in the marketplace. Smart contracts automatically confirm performance before releasing funds — unlocking fair, pay-for-what-works models.',
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
] as const satisfies Array<SimpleCardWithImageProps>
