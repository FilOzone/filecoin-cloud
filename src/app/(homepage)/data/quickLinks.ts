import {
  BracketsCurlyIcon,
  GlobeIcon,
  PushPinSimpleIcon,
  UsersThreeIcon,
} from '@phosphor-icons/react/dist/ssr'

import { FOC_URLS } from '@/constants/siteMetadata'

export const quickLinks = [
  {
    text: 'Try Filecoin Pin',
    icon: PushPinSimpleIcon,
    link: 'https://pin.filecoin.cloud/',
  },
  {
    text: 'Explore Synapse SDK',
    icon: BracketsCurlyIcon,
    link: 'https://synapse.filecoin.services/',
  },
  {
    text: 'Join the Community',
    icon: UsersThreeIcon,
    link: FOC_URLS.social.telegram,
  },
  {
    text: 'Discover Filecoin',
    icon: GlobeIcon,
    link: 'https://filecoin.io/',
  },
]
