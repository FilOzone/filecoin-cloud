import { type Address, isAddress } from 'viem'
import { z } from 'zod'

const ethereumAddressSchema = z.custom<Address>(
  (val) => typeof val === 'string' && isAddress(val),
  'Invalid Ethereum address',
)

export const providerSchema = z.object({
  capabilityKeys: z.array(z.string()),
  capacityTb: z.bigint().optional(),
  checkActivityUrl: z.url(),
  description: z.string(),
  id: z.number(),
  ipniIpfs: z.boolean(),
  ipniPiece: z.boolean(),
  isActive: z.boolean(),
  isApproved: z.boolean(),
  isEndorsed: z.boolean(),
  location: z.string(),
  maxPieceSize: z.bigint(),
  minPieceSize: z.bigint(),
  minProvingPeriod: z.bigint(),
  name: z.string(),
  payeeAddress: ethereumAddressSchema,
  paymentTokenAddress: ethereumAddressSchema,
  peerId: z.string().optional(),
  pricingPerTb: z.bigint(),
  providerId: z.number(),
  // Reachability and latency come from a live /pdp/ping probe that runs
  // progressively per row (see hooks/use-service-providers). They are absent
  // on the base contract data and filled in as each probe resolves.
  reachable: z.boolean().optional(),
  latencyMs: z.number().optional(),
  serviceProviderAddress: ethereumAddressSchema,
  serviceStatus: z.string().optional(),
  serviceUrl: z.url(),
  softwareVersion: z.string().optional(),
})

export const providersSchema = z.array(providerSchema)

export type ServiceProvider = z.infer<typeof providerSchema>

/**
 * Status of the per-provider runtime probe (/version + /pdp/ping) that the
 * service-providers table fires for each row after the base list renders.
 */
export type ProviderRuntimeStatus = 'pending' | 'success' | 'error'

/**
 * A provider row in the service-providers table: base contract data plus the
 * progressively-loaded runtime probe status. `softwareVersion`, `reachable`,
 * and `latencyMs` are populated once the probe for that row resolves.
 */
export type ServiceProviderRow = ServiceProvider & {
  runtimeStatus: ProviderRuntimeStatus
}
