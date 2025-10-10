import FilozLogo from '@/public/filoz-logo.svg'
import FilecoinFoundationLogo from '@/public/filecoin-foundation-logo.svg'

if (!process.env.VERCEL_PROJECT_PRODUCTION_URL) {
  throw new Error('VERCEL_PROJECT_PRODUCTION_URL is not defined')
}

const FF_URL = 'https://fil.org/'
export const BASE_URL = 'https://' + process.env.VERCEL_PROJECT_PRODUCTION_URL

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
    label: 'Filecoin Pin',
    cta: 'Coming Soon',
  },
  {
    label: 'Read the Docs',
    cta: 'Synapse SDK',
    link: 'https://synapse.filecoin.services/',
  },
  {
    label: 'Join the Community',
    cta: '#fil-services Slack',
    link: 'https://filecoinproject.slack.com/archives/C07CGTXHHT4',
  },
  {
    label: 'Discover Filecoin',
    cta: 'filecoin.io',
    link: 'https://filecoin.io/',
  },
]
