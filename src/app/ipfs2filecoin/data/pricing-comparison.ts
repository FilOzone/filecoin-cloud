import { COPIES } from '../constants/migration'
import { formatUsd, USD_PER_TB_MONTH } from '../utils/estimate-cost'

export type PricingRow = {
  service: string
  /**
   * The qualifier under the provider name: which plan the rate comes from, or
   * what the Filecoin figure covers. Split out from the service so the provider
   * is what you compare on and the tier name stays secondary: at one size they
   * competed, and two Pinata tiers read as two unrelated vendors. Every row
   * carries one so the rows are the same height.
   */
  detail: string
  storagePerTbMonth: string
  egress: string
  highlighted?: boolean
}

/**
 * Third-party rates are published list overage rates, re-verified 3 August 2026
 * against filebase.com/pricing and pinata.cloud/pricing. Overage is the rate
 * that matters once you are past a plan's included allowance, which anyone
 * migrating a real archive already is. These move without notice; re-check
 * before each campaign push.
 */
export const pricingComparison: Array<PricingRow> = [
  {
    service: 'Filecoin Warm Storage',
    detail: `${COPIES} copies included`,
    storagePerTbMonth: formatUsd(USD_PER_TB_MONTH),
    /**
     * Deliberately not a price and deliberately not "free". Reads happen by CID
     * over public IPFS gateways, which this service does not meter. Fast
     * delivery through Filecoin Beam is a separate, paid product, so any claim
     * of zero egress cost here would be wrong.
     */
    egress: 'Read by CID from any IPFS gateway',
    highlighted: true,
  },
  {
    service: 'Filebase',
    detail: 'Pro plan overage',
    storagePerTbMonth: '$15.00',
    egress: '$0.015 / GB',
  },
  {
    service: 'Pinata',
    detail: 'Fiesta plan overage',
    storagePerTbMonth: '$35.00',
    egress: '$0.080 / GB',
  },
  {
    service: 'Pinata',
    detail: 'Picnic plan overage',
    storagePerTbMonth: '$70.00',
    egress: '$0.100 / GB',
  },
]
