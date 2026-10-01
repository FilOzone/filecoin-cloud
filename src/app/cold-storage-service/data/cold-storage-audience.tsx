import type { CardData } from '@filecoin-foundation/ui-filecoin/Card'
import { BooksIcon, RobotIcon } from '@phosphor-icons/react/dist/ssr'

export const coldStorageAudience = [
  {
    title: 'AI/ML data teams',
    description:
      'Training datasets, model checkpoints, and inference logs pile up fast and are read rarely. Cost per TiB at scale matters more than any single retrieval time.',
    icon: RobotIcon,
  },
  {
    title: 'Media, research & archival institutions',
    description:
      'Media libraries, scientific and genomic repositories, and public archives with long-retention, latency-tolerant datasets that need durability over decades.',
    icon: BooksIcon,
  },
] as const satisfies Array<CardData>
