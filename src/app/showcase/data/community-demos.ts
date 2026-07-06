import type { ShowcaseCardData } from '@/components/ShowcaseCard'

export const communityDemos = [
  {
    title: 'Filosign',
    description:
      'A decentralized DocuSign alternative where signatures and verifications persist immutably on Filecoin, staying verifiable long after they are made.',
    badge: { text: 'E-signatures', variant: 'primary' },
    primary: {
      href: 'https://app.filosign.xyz/',
      label: 'Open the app',
    },
  },
  {
    title: 'W3Stor',
    description:
      'A storage and memory layer for AI agents. Files and memories get an IPFS CID, replicate across FOC providers with PDP attestation, and form a semantic graph for recall.',
    badge: { text: 'Agent memory', variant: 'primary' },
    primary: {
      href: 'https://www.w3stor.xyz/',
      label: 'Open W3Stor',
    },
    source: {
      href: 'https://github.com/aikarap/w3stor',
      label: 'View code',
    },
  },
  {
    title: 'Engram SDK',
    description:
      "A budget-aware memory SDK for AI agents. Every store writes content-addressed data to Filecoin through the Synapse SDK, paid from the agent's own wallet in USDFC.",
    badge: { text: 'Memory SDK', variant: 'primary' },
    primary: {
      href: 'https://engramsdk.dev/',
      label: 'Visit site',
    },
    source: {
      href: 'https://github.com/aryza0x/engram-sdk',
      label: 'View code',
    },
  },
  {
    title: 'Compose Mesh',
    description:
      'A desktop runtime where autonomous agents network over libp2p and anchor their state to Filecoin through the Synapse SDK. The Compose.Market marketplace lets users build and monetize agent swarms.',
    badge: { text: 'Agent platform', variant: 'primary' },
    primary: {
      href: 'https://compose.market',
      label: 'Open Compose',
    },
    source: {
      href: 'https://github.com/compose-market/mesh',
      label: 'View code',
    },
  },
  {
    title: 'Spawn Protocol',
    description:
      'An AI agent swarm that governs DAOs onchain. Parent agents spawn children to vote on proposals, storing execution logs and lineage on Filecoin through the Synapse SDK.',
    badge: { text: 'DAO agents', variant: 'primary' },
    primary: {
      href: 'https://spawn-protocol-f1td.vercel.app/',
      label: 'Open the app',
    },
    source: {
      href: 'https://github.com/ishitab02/Spawn-Protocol',
      label: 'View code',
    },
  },
  {
    title: 'FilCraft',
    description:
      'An onchain marketplace where AI agents register identities, build reputation, and sell data, paid over x402. Session transcripts and outputs are stored on Filecoin through the Synapse SDK.',
    badge: { text: 'Agent economy', variant: 'primary' },
    primary: {
      href: 'https://filcraft.vercel.app/',
      label: 'Open the app',
    },
    source: {
      href: 'https://github.com/sirdesai22/filcraft',
      label: 'View code',
    },
  },
  {
    title: 'EJENTS',
    description:
      'Autonomous agents run an onchain credit market of lending, tasks, and liquidations. Snapshots and reasoning traces are pinned with Filecoin Pin and recorded onchain.',
    badge: { text: 'Credit markets', variant: 'primary' },
    primary: {
      href: 'https://ejents.vercel.app',
      label: 'Open the app',
    },
    source: {
      href: 'https://github.com/Leihyn/ejents',
      label: 'View code',
    },
  },
  {
    title: 'Claw Vault',
    description:
      "A CLI that snapshots an AI agent's full state and backs it up to Filecoin Warm Storage with PDP-verified copies, restoring it byte for byte from a CID.",
    badge: { text: 'Agent backup', variant: 'primary' },
    source: {
      href: 'https://github.com/Shriiii01/claw_vault',
      label: 'View code',
    },
  },
  {
    title: 'Filify',
    description:
      'A deploy platform for the decentralized web. Connect a repo, build, publish to Filecoin through filecoin-pin, and point an ENS name at the resulting CID.',
    badge: { text: 'Deploy platform', variant: 'primary' },
    source: {
      href: 'https://github.com/hrsh22/filify',
      label: 'View code',
    },
  },
  {
    title: 'dMail',
    description:
      'A serverless, encrypted email client addressed by ENS. Messages and attachments are stored on Filecoin through the Synapse SDK.',
    badge: { text: 'Encrypted email', variant: 'primary' },
    source: {
      href: 'https://github.com/rohitshukla11/dmail',
      label: 'View code',
    },
  },
  {
    title: 'Agentex',
    description:
      'A marketplace where AI trading agents buy and sell encrypted trade experiences. The reasoning is pinned to Filecoin with onchain proofs and settled with Filecoin Pay.',
    badge: { text: 'Agent marketplace', variant: 'primary' },
    source: {
      href: 'https://github.com/casterkay/Agentex',
      label: 'View code',
    },
  },
] as const satisfies Array<ShowcaseCardData>
