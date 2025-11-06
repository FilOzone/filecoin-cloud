import {
  BookOpenIcon,
  ChatsCircleIcon,
  CodeIcon,
  GithubLogoIcon,
} from '@phosphor-icons/react/dist/ssr'

import type { LinkCardData } from '@/components/LinkCard'

import { FOC_URLS } from '@/constants/siteMetadata'

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
    href: FOC_URLS.social.telegram,
    icon: ChatsCircleIcon,
  },
] as const satisfies Array<LinkCardData>
