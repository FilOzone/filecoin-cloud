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
  serviceProviderAddress: ethereumAddressSchema,
  serviceStatus: z.string().optional(),
  serviceUrl: z.url(),
  softwareVersion: z.string().optional(),
})

export const providersSchema = z.array(providerSchema)

export type ServiceProvider = z.infer<typeof providerSchema>
