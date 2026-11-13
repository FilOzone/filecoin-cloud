import type { CardData } from '@filecoin-foundation/ui-filecoin/Card'
import { CodeIcon, PushPinIcon } from '@phosphor-icons/react/dist/ssr'

export const warmStorageIntegrations = [
  {
    title: 'Synapse SDK',
    description:
      'Build Filecoin Warm Storage directly into your app. Upload, retrieve, and verify files in a few lines of code.',
    icon: CodeIcon,
  },
  {
    title: 'Filecoin Pin',
    description:
      'Pin and persist IPFS content on Filecoin Warm Storage with a familiar, IPFS-compatible workflow, no smart contract code required.',
    icon: PushPinIcon,
  },
] as const satisfies Array<CardData>
