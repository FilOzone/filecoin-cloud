import type { PhaseProps } from '@/components/Phase'

export const buildPhases: Array<
  Pick<PhaseProps, 'date' | 'title' | 'description' | 'status'>
> = [
  {
    date: 'Oct 2025',
    title: 'Filecoin Pin',
    description:
      'Lorem ipsum dolor sit amet consectetur. Feugiat non pulvinar senectus bibendum vitae.',
    status: 'completed',
  },
  {
    date: 'Nov 2025',
    title: 'Filecoin Onchain Cloud launch',
    description:
      'Lorem ipsum dolor sit amet consectetur. Feugiat non pulvinar senectus bibendum vitae.',
    status: 'current',
  },
  {
    date: 'Dec 2025',
    title: 'Encryption',
    description:
      'Lorem ipsum dolor sit amet consectetur. Feugiat non pulvinar senectus bibendum vitae.',
    status: 'upcoming',
  },
  {
    date: 'Jan 2026',
    title: 'Access Control Lists',
    description:
      'Lorem ipsum dolor sit amet consectetur. Feugiat non pulvinar senectus bibendum vitae.',
    status: 'upcoming',
  },
  {
    date: 'Sep 2026',
    title: 'Erasure Coding',
    description:
      'Lorem ipsum dolor sit amet consectetur. Feugiat non pulvinar senectus bibendum vitae.',
    status: 'upcoming',
  },
]
