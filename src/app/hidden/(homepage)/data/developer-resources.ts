import {
  BookOpenIcon,
  GlobeIcon,
  TelegramLogoIcon,
  YoutubeLogoIcon,
} from '@phosphor-icons/react/dist/ssr'

import type { LinkCardData } from '@/components/LinkCard'

import { FOC_URLS } from '@/constants/site-metadata'

export const developerResources = [
  {
    title: 'Learn more about Filecoin',
    href: 'https://filecoin.io/',
    icon: GlobeIcon,
  },
  {
    title: 'Documentation',
    href: FOC_URLS.documentation,
    icon: BookOpenIcon,
  },
  {
    title: 'Explore our YouTube playlist',
    href: 'https://www.youtube.com/watch?v=0oD0J-4lIXg&list=PL_0VrY55uV181dWs7RfIpx0ZAUZeNMjE1',
    icon: YoutubeLogoIcon,
  },
  {
    title: 'Join the community',
    href: FOC_URLS.social.telegram,
    icon: TelegramLogoIcon,
  },
] as const satisfies Array<LinkCardData>
