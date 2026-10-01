export const WHY_FOC_COLUMN_LABELS = [
  'Dimension',
  'Traditional cloud storage',
  'Filecoin Onchain Cloud',
] as const

export const whyFocComparison = [
  {
    dimension: 'Verifiability',
    first: 'Trust the vendor’s SLA — no proof your data is intact',
    second:
      'Continuous onchain proofs (PDP, every few minutes) confirm your data is actually stored',
  },
  {
    dimension: 'Pricing',
    first: 'Opaque tiers, egress fees that can dwarf the storage bill',
    second:
      'Transparent onchain pricing from $2.50/TiB/month, published per provider',
  },
  {
    dimension: 'Vendor lock-in',
    first: 'One vendor controls your data, pricing, and availability',
    second:
      'Open marketplace of independent storage providers you can move between',
  },
  {
    dimension: 'Payment model',
    first: 'You pay whether or not the vendor actually delivers',
    second:
      'Payments pause automatically the moment proofs fail — pay only for what’s proven',
  },
] as const
