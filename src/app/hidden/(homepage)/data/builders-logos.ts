import type { LogoItemProps } from '@filecoin-foundation/ui-filecoin/LogoSection/LogoItem'

import AkaveLogo from '@/public/assets/logos/akave-logo.svg'
import CairnLogo from '@/public/assets/logos/cairn-logo.svg'
import ChaChingLogo from '@/public/assets/logos/chaching-logo.svg'
import EnsLogo from '@/public/assets/logos/ens-logo.svg'
import ERC8004Logo from '@/public/assets/logos/erc8004-logo.svg'
import GeoLogo from '@/public/assets/logos/geo-logo.svg'
import KyveLogo from '@/public/assets/logos/kyve-logo.svg'
import MonadLogo from '@/public/assets/logos/monad-logo.svg'
import SafeLogo from '@/public/assets/logos/safe-logo.svg'
import StorachaLogo from '@/public/assets/logos/storacha-logo.svg'

export const buildersLogos: Array<LogoItemProps> = [
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
    logo: ERC8004Logo,
    alt: 'ERC-8004 Logo',
    href: 'https://docs.filecoin.io/builder-cookbook/filecoin-pin/erc-8004-agent-registration',
  },
  {
    logo: SafeLogo,
    alt: 'Safe Logo',
    href: 'https://safe.global/',
  },
  {
    logo: KyveLogo,
    alt: 'KYVE Logo',
    href: 'https://kyve.network/',
  },
  {
    logo: ChaChingLogo,
    alt: 'ChaChing Logo',
    href: 'https://cha-ching.it/',
  },
  {
    logo: CairnLogo,
    alt: 'Cairn Logo',
    href: 'https://cairn.live/',
  },
  {
    logo: GeoLogo,
    alt: 'Geo Logo',
    href: 'https://geoweb.network/',
  },
]
