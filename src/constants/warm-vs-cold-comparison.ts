export const WARM_VS_COLD_COLUMN_LABELS = [
  'Dimension',
  'Filecoin Warm Storage (FWSS)',
  'Filecoin Cold Storage (FCSS)',
] as const

export const WARM_VS_COLD_COMPARISON = [
  {
    dimension: 'Proof mechanism',
    first: 'Proof of Data Possession (PDP) — continuous, lightweight proofs',
    second:
      'Proof of Replication (PoRep) — sealed at write time, onchain-verified',
  },
  {
    dimension: 'Pricing',
    first: 'From $2.50/TiB/month per copy (2-copy minimum)',
    second: 'From $2/TiB/month, 1 copy',
  },
  {
    dimension: 'Access pattern',
    first: 'Hot — fast retrieval for actively-used data',
    second: 'Cold — archival, for infrequently-accessed data',
  },
  {
    dimension: 'Typical dataset size',
    first: 'Any size, optimized for frequent reads',
    second: '1 TiB and up',
  },
  {
    dimension: 'Best for',
    first: 'App data, media serving, agent workloads',
    second:
      'AI/ML training data, model checkpoints, media and research archives',
  },
  {
    dimension: 'Payment rail',
    first: 'Filecoin Pay',
    second: 'Filecoin Pay',
  },
] as const
