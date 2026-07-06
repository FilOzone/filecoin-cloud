import type { ShowcaseCardData } from '@/components/ShowcaseCard'

export const buildingBlocks = [
  {
    title: 'Synapse SDK',
    description:
      'The core JavaScript and TypeScript SDK for Filecoin Onchain Cloud, covering storage, USDFC payments, session keys, and retrieval across Node, browsers, and React.',
    badge: { text: 'SDK', variant: 'primary' },
    primary: {
      href: 'https://docs.filecoin.cloud',
      label: 'Read the docs',
    },
    source: {
      href: 'https://github.com/FilOzone/synapse-sdk',
      label: 'View code',
    },
  },
  {
    title: 'FOC Upload dApp',
    description:
      'A production Next.js starter for FOC storage apps, with multi-file uploads, CDN and Filecoin Pin modes, USDFC management, and a live dashboard.',
    badge: { text: 'Starter dApp', variant: 'primary' },
    primary: {
      href: 'https://foc-demo.filbuilders.eth.limo',
      label: 'Try the demo',
    },
    source: {
      href: 'https://github.com/FIL-Builders/foc-upload-dapp',
      label: 'View code',
    },
  },
  {
    title: 'Filecoin Pin',
    description:
      'Decentralized IPFS pinning backed by Filecoin proofs. It pins content to the PDP service and ships as a CLI, a library, and a GitHub Action.',
    badge: { text: 'IPFS pinning', variant: 'primary' },
    primary: {
      href: 'https://pin.filecoin.cloud/',
      label: 'Open Filecoin Pin',
    },
    source: {
      href: 'https://github.com/filecoin-project/filecoin-pin',
      label: 'View code',
    },
  },
  {
    title: 'Synapse Playground',
    description:
      'An in-repo React and Vite example that exercises FOC storage, payments, and retrieval through the Synapse SDK.',
    badge: { text: 'Example app', variant: 'primary' },
    source: {
      href: 'https://github.com/FilOzone/synapse-sdk/tree/master/apps/synapse-playground',
      label: 'View code',
    },
  },
  {
    title: 'Synapse Go',
    description:
      'A community Go port of the Synapse SDK that brings FOC storage, payments, and retrieval to Go services.',
    badge: { text: 'Go SDK', variant: 'primary' },
    source: {
      href: 'https://github.com/strahe/synapse-go',
      label: 'View code',
    },
  },
  {
    title: 'Pynapse',
    description:
      'A Python port of the Synapse SDK that brings FOC storage, payments, and retrieval to Python apps and agents.',
    badge: { text: 'Python SDK', variant: 'primary' },
    primary: {
      href: 'https://pypi.org/project/synapse-filecoin-sdk/',
      label: 'View on PyPI',
    },
    source: {
      href: 'https://github.com/anjor/pynapse',
      label: 'View code',
    },
  },
] as const satisfies Array<ShowcaseCardData>
