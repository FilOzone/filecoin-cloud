import { FILECOIN_FOUNDATION_URL } from '@/constants/site-metadata'
import FilecoinFoundationLogo from '@/public/filecoin-foundation-logo.svg'
import FilozLogo from '@/public/filoz-logo.svg'

export const footerLinks = {
  createdBy: [
    {
      icon: FilozLogo,
      url: 'https://www.filoz.org/',
      label: 'Filoz',
    },
    {
      icon: FilecoinFoundationLogo,
      url: FILECOIN_FOUNDATION_URL,
      label: 'Filecoin Foundation',
    },
  ],
  legal: [
    {
      label: 'Privacy Policy',
      url: `${FILECOIN_FOUNDATION_URL}privacy-policy/`,
    },
    { label: 'Terms of Use', url: `${FILECOIN_FOUNDATION_URL}terms-of-use/` },
  ],
}
