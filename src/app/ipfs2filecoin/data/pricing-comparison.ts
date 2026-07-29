import { formatUsd, USD_PER_TB_MONTH } from '../utils/estimate-cost'

export type PricingRow = {
  service: string
  storagePerTbMonth: string
  egress: string
  highlighted?: boolean
}

/**
 * Third-party rates are published list overage rates, captured 27 July 2026.
 * Overage is the rate that matters once you are past a plan's included
 * allowance, which anyone migrating a real archive already is.
 */
export const pricingComparison: Array<PricingRow> = [
  {
    service: 'Filecoin Warm Storage',
    storagePerTbMonth: formatUsd(USD_PER_TB_MONTH),
    egress: 'IPFS gateway read path',
    highlighted: true,
  },
  {
    service: 'Filebase, Pro overage',
    storagePerTbMonth: '$15.00',
    egress: '$0.015 / GB',
  },
  {
    service: 'Pinata, Fiesta overage',
    storagePerTbMonth: '$35.00',
    egress: '$0.080 / GB',
  },
  {
    service: 'Pinata, Picnic overage',
    storagePerTbMonth: '$70.00',
    egress: '$0.100 / GB',
  },
]
