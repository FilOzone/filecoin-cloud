import { type Address, getAddress, isAddress } from 'viem'
import { z } from 'zod'

const ethereumAddressSchema = z
  .string()
  .refine(
    (value) => isAddress(value, { strict: false }),
    'Invalid Ethereum address',
  )
  .transform((value) => getAddress(value) as Address)

const deploymentContractSchema = z
  .object({
    initcode_hash: z.string().optional(),
    artifact_contract: z.string().optional(),
    libraries: z.record(z.string(), ethereumAddressSchema).optional(),
    constructor_args: z.array(z.string()).optional(),
    pinned: z.boolean().optional(),
  })
  .passthrough()

const deploymentsMetadataSchema = z
  .object({
    note: z.string().optional(),
    commit: z.string().optional(),
    deployed_at: z.string().optional(),
    fwss_version: z.string().optional(),
    pdp_version: z.string().optional(),
  })
  .passthrough()

const chainDeploymentsSchema = z
  .object({
    metadata: deploymentsMetadataSchema.optional(),
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
    contracts: z.record(z.string(), deploymentContractSchema).optional(),
  })
  .catchall(ethereumAddressSchema)

export const deploymentsSchema = z.object({
  '314': chainDeploymentsSchema,
  '314159': chainDeploymentsSchema,
})

export type ChainDeployments = z.infer<typeof chainDeploymentsSchema>
export type Deployments = z.infer<typeof deploymentsSchema>
