import type { PhaseProps } from '@/components/Phase'

export const buildPhases: Array<
  Pick<PhaseProps, 'date' | 'title' | 'description' | 'status'>
> = [
  {
    date: 'Apr 2025',
    title: 'Phase I',
    description:
      'Lorem ipsum dolor sit amet consectetur. Feugiat non pulvinar senectus bibendum vitae.',
    status: 'completed',
  },
  {
    date: 'Oct 2025',
    title: 'Phase II',
    description:
      'Lorem ipsum dolor sit amet consectetur. Feugiat non pulvinar senectus bibendum vitae.',
    status: 'current',
  },
  {
    date: 'Nov 2025',
    title: 'Phase III',
    description:
      'Lorem ipsum dolor sit amet consectetur. Feugiat non pulvinar senectus bibendum vitae.',
    status: 'upcoming',
  },
  {
    date: 'Jan 2026',
    title: 'Phase IV',
    description:
      'Lorem ipsum dolor sit amet consectetur. Feugiat non pulvinar senectus bibendum vitae.',
    status: 'upcoming',
  },
  {
    date: 'Sep 2026',
    title: 'Phase V',
    description:
      'Lorem ipsum dolor sit amet consectetur. Feugiat non pulvinar senectus bibendum vitae.',
    status: 'upcoming',
  },
]
