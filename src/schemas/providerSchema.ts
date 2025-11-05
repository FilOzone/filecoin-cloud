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
  serviceUrl: z.url().optional(),
  pricingPerTb: z.string(),
  minPieceSize: z.string(),
  maxPieceSize: z.string(),
  isActive: z.boolean(),
  providerId: z.number(),
  location: z.string(),
  ipniPiece: z.boolean(),
  ipniIpfs: z.boolean(),
  paymentTokenAddress: ethereumAddressSchema,
  capabilityKeys: z.array(z.string()),
  serviceStatus: z.string().nullable().optional(),
  peerId: z.string().optional(),
  softwareVersion: z.string(),
})

export const providersSchema = z.array(providerSchema)

export type ServiceProvider = z.infer<typeof providerSchema>
