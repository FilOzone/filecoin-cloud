import type { Service } from 'schema-dts'

import { ORGANIZATION_ID } from '@/constants/structured-data'

import { generateImageObject } from './generate-image-object'

type GenerateServiceSchemaProps = {
  id: string
  name: string
  description: string
  imageUrl?: string
  webPageUrl: string
  serviceType: string
  areaServed: string
}

export function generateServiceSchema({
  id,
  name,
  description,
  imageUrl,
  webPageUrl,
  serviceType,
  areaServed,
}: GenerateServiceSchemaProps): Service {
  return {
    '@type': 'Service',
    '@id': id,
    name,
    description,
    url: webPageUrl,
    ...(imageUrl && { image: generateImageObject({ imageUrl }) }),
    provider: { '@id': ORGANIZATION_ID },
    serviceType,
    areaServed,
  }
}
