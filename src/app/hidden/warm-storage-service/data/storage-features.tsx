import type { CardData } from '@filecoin-foundation/ui-filecoin/Card'
import { ExternalTextLink } from '@filecoin-foundation/ui-filecoin/TextLink/ExternalTextLink'
import {
  CertificateIcon,
  PlugsConnectedIcon,
  ShieldCheckIcon,
} from '@phosphor-icons/react/dist/ssr'

import { FOC_URLS } from '@/constants/site-metadata'

export const storageFeatures = [
  {
    title: 'Verifiable Storage',
    description: (
      <>
        Onchain{' '}
        <ExternalTextLink href={FOC_URLS.proofOfDataPossession}>
          proof of data possession
        </ExternalTextLink>{' '}
        ensures your data is always verifiable and secure.
      </>
    ),
    icon: ShieldCheckIcon,
  },
  {
    title: 'Service Level Agreements',
    description:
      'Smart contract-based service level agreements for verified uptime.',
    icon: CertificateIcon,
  },
  {
    title: 'Easy Integration',
    description:
      'Simple SDK and APIs to integrate storage into your applications.',
    icon: PlugsConnectedIcon,
  },
] as const satisfies Array<CardData>
