import { type Address, isAddress } from 'viem'
import { z } from 'zod'

const ethereumAddressSchema = z
  .string()
  .refine(isAddress, 'Invalid Ethereum address')
  .transform((val) => val as Address)

const chainDeploymentsSchema = z.object({
  metadata: z
    .object({
      note: z.string().optional(),
    })
    .optional(),
  FILECOIN_PAY_ADDRESS: ethereumAddressSchema,
  PDP_VERIFIER_PROXY_ADDRESS: ethereumAddressSchema,
  PDP_VERIFIER_IMPLEMENTATION_ADDRESS: ethereumAddressSchema,
  SESSION_KEY_REGISTRY_ADDRESS: ethereumAddressSchema,
  SERVICE_PROVIDER_REGISTRY_PROXY_ADDRESS: ethereumAddressSchema,
  SERVICE_PROVIDER_REGISTRY_IMPLEMENTATION_ADDRESS: ethereumAddressSchema,
  SIGNATURE_VERIFICATION_LIB_ADDRESS: ethereumAddressSchema,
  FWSS_PROXY_ADDRESS: ethereumAddressSchema,
  FWSS_IMPLEMENTATION_ADDRESS: ethereumAddressSchema,
  FWSS_VIEW_ADDRESS: ethereumAddressSchema,
  ENDORSEMENT_SET_ADDRESS: ethereumAddressSchema,
})

export const deploymentsSchema = z.object({
  '314': chainDeploymentsSchema,
  '314159': chainDeploymentsSchema,
})

export type ChainDeployments = z.infer<typeof chainDeploymentsSchema>
export type Deployments = z.infer<typeof deploymentsSchema>
