import type { SimpleCardWithImageProps } from '@/components/SimpleCardWithImage'

import { PATHS } from '@/constants/paths'
import spaceStation from '@/public/assets/space-station.webp'
import spiralGalaxy from '@/public/assets/spiral-galaxy.webp'

const CTA_TEXT = 'Explore'

export const storeOfferings: Array<SimpleCardWithImageProps> = [
  {
    title: 'Filecoin Warm Storage (FWSS)',
    description:
      'Fast, continuously-verified storage for active data. Proven every few minutes with Proof of Data Possession (PDP), from $2.50/TiB/month.',
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
    title: 'Filecoin Cold Storage (FCSS)',
    description:
      'Low-cost, durable archival storage for large, infrequently-accessed datasets. Sealed and proven with Proof of Replication (PoRep), built for 1TiB+ datasets.',
    cta: {
      href: PATHS.COLD_STORAGE_SERVICE.path,
      text: CTA_TEXT,
    },
    image: {
      data: spiralGalaxy,
      alt: 'Spiral galaxy with bright core and sweeping arms of stars on a deep space background.',
    },
  },
] as const satisfies Array<SimpleCardWithImageProps>
