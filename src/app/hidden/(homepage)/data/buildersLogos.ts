import type { LogoItemProps } from '@filecoin-foundation/filecoin-ui/LogoSection/LogoItem'

import AkaveLogo from '@/public/assets/logos/akave-logo.svg'
import EnsLogo from '@/public/assets/logos/ens-logo.svg'
import MonadLogo from '@/public/assets/logos/monad-logo.svg'
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
    logo: EnsLogo,
    alt: 'ENS Logo',
    href: 'https://ens.domains/',
  },
  {
    logo: MonadLogo,
    alt: 'Monad Logo',
    href: 'https://monad.xyz/',
  },
]
