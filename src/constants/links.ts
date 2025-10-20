import {
  BracketsCurlyIcon,
  GlobeIcon,
  PushPinSimpleIcon,
  UsersThreeIcon,
} from '@phosphor-icons/react/dist/ssr'
import FilecoinFoundationLogo from '@/public/filecoin-foundation-logo.svg'
import FilozLogo from '@/public/filoz-logo.svg'

export const PRODUCTION_URL =
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'filecoin-cloud-alpha.vercel.app/'

const FF_URL = 'https://fil.org/'
export const BASE_URL = `https://${PRODUCTION_URL}`

export const waitlistFormLink =
  'https://ct2xy.share.hsforms.com/2WWxi-evaTTeHM0O-uXAu3Q'

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
