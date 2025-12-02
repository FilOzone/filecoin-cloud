import type { Organization, WebSite } from 'schema-dts'

import { generateImageObject } from '@/utils/generate-image-object'

import { BASE_URL, FOC_URLS, ORGANIZATION_NAME } from './site-metadata'

export const SCHEMA_CONTEXT_URL = 'https://schema.org'

export const STRUCTURED_DATA_IDS = {
  ORGANIZATION: '#organization',
  SERVICE: '#service',
  WEBSITE: '#website',
  WEBPAGE: '#webpage',
}

export const ORGANIZATION_ID = `${BASE_URL}/${STRUCTURED_DATA_IDS.ORGANIZATION}`
export const WEBSITE_ID = `${BASE_URL}/${STRUCTURED_DATA_IDS.WEBSITE}`

const { twitter, linkedIn, github } = FOC_URLS.social

export const ORGANIZATION_SCHEMA: Organization = {
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: ORGANIZATION_NAME,
  url: BASE_URL,
  logo: generateImageObject({
    imageUrl: '/assets/logos/foc-logo-icon.svg',
    width: 520,
    height: 520,
  }),
  sameAs: [twitter, linkedIn, github],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
    },
  ],
}

export const WEBSITE_SCHEMA: WebSite = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: BASE_URL,
  name: ORGANIZATION_NAME,
  publisher: { '@id': ORGANIZATION_ID },
}
