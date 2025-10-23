import {
  BracketsCurlyIcon,
  GlobeIcon,
  PushPinSimpleIcon,
  UsersThreeIcon,
} from '@phosphor-icons/react/dist/ssr'

import FilecoinFoundationLogo from '@/public/filecoin-foundation-logo.svg'
import FilozLogo from '@/public/filoz-logo.svg'

const FF_URL = 'https://fil.org/'

export const footerLinks = {
  createdBy: [
    {
      icon: FilozLogo,
      url: 'https://www.filoz.org/',
      label: 'Filoz',
    },
    {
      icon: FilecoinFoundationLogo,
      url: FF_URL,
      label: 'Filecoin Foundation',
    },
  ],
  legal: [
    { label: 'Privacy Policy', url: `${FF_URL}privacy-policy/` },
    { label: 'Terms of Use', url: `${FF_URL}terms-of-use/` },
  ],
}

export const homeLinks = [
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
    link: 'https://filecoinproject.slack.com/archives/C07CGTXHHT4',
  },
  {
    text: 'Discover Filecoin',
    icon: GlobeIcon,
    link: 'https://filecoin.io/',
  },
]
