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
    href: 'https://synapse.filecoin.services/',
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
    href: 'https://filecoinproject.slack.com/archives/C07CGTXHHT4',
    icon: ChatsCircleIcon,
  },
] as const satisfies Array<LinkCardData>
