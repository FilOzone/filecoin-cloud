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
