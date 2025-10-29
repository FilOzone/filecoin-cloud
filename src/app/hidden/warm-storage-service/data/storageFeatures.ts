import type { CardData } from '@filecoin-foundation/ui-filecoin/Card'
import {
  CertificateIcon,
  PlugsConnectedIcon,
  ShieldCheckIcon,
} from '@phosphor-icons/react/dist/ssr'

export const storageFeatures = [
  {
    title: 'Verifiable Storage',
    description:
      'On-chain proof of data possession ensures your data is always verifiable and secure.',
    icon: ShieldCheckIcon,
  },
  {
    title: 'SLA Guaranteed',
    description:
      'Service level agreements backed by smart contracts for guaranteed uptime.',
    icon: CertificateIcon,
  },
  {
    title: 'Easy Integration',
    description:
      'Simple SDK and APIs to integrate storage into your applications.',
    icon: PlugsConnectedIcon,
  },
] as const satisfies Array<CardData>
