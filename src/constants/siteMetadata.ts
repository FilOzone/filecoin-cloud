import type { Metadata } from 'next'

const BASE_DOMAIN = 'www.filecoin.cloud'
const BASE_URL = `https://${BASE_DOMAIN}`
const ORGANIZATION_NAME = 'FilOz'

const META_TITLE = 'Filecoin Onchain Cloud'
const META_DESCRIPTION =
  'Filecoin Onchain Cloud provides transparent storage, retrieval, and payments on the Filecoin network. Launching soon!'

const FILECOIN_FOUNDATION_URL = 'https://fil.org/'

const FOC_URLS = {
  warmStorageService: {
    synapseSdk: 'https://synapse.filecoin.services/',
    sourceCode:
      'https://github.com/FilOzone/filecoin-services/releases/tag/alpha%2Fcalibnet%2F0x80617b65FD2EEa1D7fDe2B4F85977670690ed348-v2',
    spDocumentation: 'https://docs.filecoin.io/storage-providers/pdp/',
  },
}

const METADATA: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: META_TITLE,
  description: META_DESCRIPTION,
  openGraph: {
    type: 'website',
    title: META_TITLE,
    description: META_DESCRIPTION,
    url: BASE_URL,
    siteName: META_TITLE,
    images: [{ url: '/open-graph-image.webp' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: META_TITLE,
    description: META_DESCRIPTION,
    images: ['/open-graph-image.webp'],
  },
}

export {
  BASE_DOMAIN,
  BASE_URL,
  FILECOIN_FOUNDATION_URL,
  FOC_URLS,
  ORGANIZATION_NAME,
  METADATA,
}
