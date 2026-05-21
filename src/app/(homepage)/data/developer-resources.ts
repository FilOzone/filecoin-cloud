import type { LinkCardData } from '@filecoin-foundation/ui-filecoin/LinkCard'
import {
  BookOpenIcon,
  GithubLogoIcon,
  GlobeIcon,
  PulseIcon,
  SlackLogoIcon,
  YoutubeLogoIcon,
} from '@phosphor-icons/react/dist/ssr'

import { FOC_URLS } from '@/constants/site-metadata'

export const developerResources = [
  {
    title: 'Learn more about Filecoin',
    href: 'https://filecoin.io/',
    icon: GlobeIcon,
  },
  {
    title: 'Documentation',
    href: FOC_URLS.documentation.home,
    icon: BookOpenIcon,
  },
  {
    title: 'Join #fil-foc on Slack',
    href: FOC_URLS.social.slack,
    icon: SlackLogoIcon,
  },
  {
    title: 'Report a FOC problem',
    href: FOC_URLS.filecoinCloud.problemReports,
    icon: GithubLogoIcon,
  },
  {
    title: 'Check service status',
    href: FOC_URLS.status,
    icon: PulseIcon,
  },
  {
    title: 'Explore our YouTube playlist',
    href: 'https://www.youtube.com/watch?v=0oD0J-4lIXg&list=PL_0VrY55uV181dWs7RfIpx0ZAUZeNMjE1',
    icon: YoutubeLogoIcon,
  },
] as const satisfies Array<LinkCardData>
