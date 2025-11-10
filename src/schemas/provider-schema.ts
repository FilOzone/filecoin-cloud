import { type Address, isAddress } from 'viem'
import { z } from 'zod'

const ethereumAddressSchema = z.custom<Address>(
  (val) => typeof val === 'string' && isAddress(val),
  'Invalid Ethereum address',
)

export const providerSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  serviceProviderAddress: ethereumAddressSchema,
  payeeAddress: ethereumAddressSchema,
  serviceUrl: z.url(),
  pricingPerTb: z.bigint(),
  minPieceSize: z.bigint(),
  maxPieceSize: z.bigint(),
  capacityTb: z.bigint().optional(),
  isActive: z.boolean(),
  isApproved: z.boolean(),
  providerId: z.number(),
  location: z.string(),
  ipniPiece: z.boolean(),
  ipniIpfs: z.boolean(),
  paymentTokenAddress: ethereumAddressSchema,
  capabilityKeys: z.array(z.string()),
  serviceStatus: z.string().optional(),
  peerId: z.string().optional(),
  minProvingPeriod: z.bigint(),
  softwareVersion: z.string().optional(),
})

export const providersSchema = z.array(providerSchema)

export type ServiceProvider = z.infer<typeof providerSchema>
