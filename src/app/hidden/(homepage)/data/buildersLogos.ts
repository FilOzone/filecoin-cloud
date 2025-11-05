import type { LogoItemProps } from '@filecoin-foundation/ui-filecoin/LogoSection/LogoItem'

import AkaveLogo from '@/public/assets/logos/akave-logo.svg'
import LighthouseLogo from '@/public/assets/logos/lighthouse-logo.svg'
import StorachaLogo from '@/public/assets/logos/storacha-logo.svg'

export const buildersLogos: Array<LogoItemProps> = [
  {
    logo: StorachaLogo,
    alt: 'Storacha Logo',
    href: 'https://storacha.network/',
  },
  {
    logo: AkaveLogo,
    alt: 'Akave Logo',
    href: 'https://akave.com/',
  },
  {
    logo: LighthouseLogo,
    alt: 'Lighthouse Logo',
    href: 'https://www.lighthouse.storage/',
  },
]
