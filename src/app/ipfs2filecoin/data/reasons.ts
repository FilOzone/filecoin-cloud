import {
  CurrencyDollarIcon,
  FingerprintIcon,
  SealCheckIcon,
  WalletIcon,
} from '@phosphor-icons/react/dist/ssr'

export const reasons = [
  {
    title: 'Your CIDs do not change',
    description:
      'Nothing is re-chunked. Every CID stays byte-identical and keeps resolving from any public IPFS gateway, so existing links, IPNS names, and NFT metadata keep working exactly as they do today.',
    icon: FingerprintIcon,
  },
  {
    title: 'A fraction of pinning-service pricing',
    description:
      '$2.50 per TiB per month per copy, two copies by default. You pay storage providers directly, streamed per epoch, with no plan tiers and no minimum commitment.',
    icon: CurrencyDollarIcon,
  },
  {
    title: 'Proof, not a dashboard',
    description:
      'Storage providers prove possession onchain on a schedule. You get a receipt with transaction links, and you can verify any piece yourself at any time without asking anyone.',
    icon: SealCheckIcon,
  },
  {
    title: 'Your wallet owns it, not an account',
    description:
      'No signup and no vendor account to lose. The data set belongs to your wallet address and payment streams from your wallet straight to the providers. Reading your data never depends on your key, so the content stays reachable either way.',
    icon: WalletIcon,
  },
] as const
