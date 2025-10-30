import {
  BookOpenIcon,
  ChatsCircleIcon,
  CodeIcon,
  GithubLogoIcon,
} from '@phosphor-icons/react/dist/ssr'

import type { LinkCardData } from '@/components/LinkCard'

export const developerResources = [
  {
    title: 'Synapse SDK',
    href: '#todo',
    icon: CodeIcon,
  },
  {
    title: 'Documentation',
    href: '#todo',
    icon: BookOpenIcon,
  },
  {
    title: 'GitHub',
    href: '#todo',
    icon: GithubLogoIcon,
  },
  {
    title: 'Join the community',
    href: '#todo',
    icon: ChatsCircleIcon,
  },
] as const satisfies Array<LinkCardData>
