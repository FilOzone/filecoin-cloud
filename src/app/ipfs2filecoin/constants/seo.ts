import { USD_PER_TIB_MONTH_PER_COPY } from './migration'
import { formatUsd } from '../utils/estimate-cost'

export const IPFS2FILECOIN_SEO = {
  title: 'IPFS to Filecoin | Move Your Pinned Data Without Changing Your CIDs',
  description: `Move pinned IPFS data to Filecoin warm storage. Same CIDs, ${formatUsd(USD_PER_TIB_MONTH_PER_COPY)} per TiB per month per copy, and an onchain receipt you can verify yourself.`,
} as const
