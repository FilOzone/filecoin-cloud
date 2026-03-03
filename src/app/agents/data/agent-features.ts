import type { CardData } from '@filecoin-foundation/ui-filecoin/Card'
import {
  ArrowsLeftRightIcon,
  BankIcon,
  FileTextIcon,
  FingerprintIcon,
  ShieldCheckIcon,
} from '@phosphor-icons/react/dist/ssr'

export const agentFeatures = [
  {
    title: 'No credit cards or centralized accounts',
    description:
      'Filecoin enables direct onchain storage agreements between clients and providers — without intermediaries or centralized billing systems.',
    icon: BankIcon,
  },
  {
    title: 'Machine-to-machine payments',
    description:
      'Agents transact directly with infrastructure. Payments for storage and retrieval are executed programmatically, enabling seamless machine-to-machine coordination.',
    icon: ArrowsLeftRightIcon,
  },
  {
    title: 'Durable memory (not best-effort persistence)',
    description:
      'Agent memory must be long-lived and cryptographically enforced. Filecoin guarantees storage integrity and continuity — not temporary cache or best-effort persistence.',
    icon: ShieldCheckIcon,
  },
  {
    title: 'Verifiable execution logs',
    description:
      'Every storage and retrieval action produces verifiable records. Agents can reference transparent, audit-ready execution logs.',
    icon: FileTextIcon,
  },
  {
    title: 'Identity-aware storage (ERC-8004 compatible)',
    description:
      'Storage is linked to agent identity standards like ERC-8004, enabling persistent, address-bound memory controlled by the agent itself.',
    icon: FingerprintIcon,
  },
] as const satisfies Array<CardData>
