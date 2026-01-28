import { deploymentsSchema } from '@/schemas/deployments-schema'

import deploymentsJson from './deployments.json'

const deployments = deploymentsSchema.parse(deploymentsJson)

export default deployments
