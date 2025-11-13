import type { Metadata } from 'next'

const BASE_DOMAIN = 'www.filecoin.cloud'
const BASE_URL = `https://${BASE_DOMAIN}`
const ORGANIZATION_NAME = 'FilOz'

const META_TITLE = 'Filecoin Onchain Cloud'
const META_DESCRIPTION =
  'Filecoin Onchain Cloud provides transparent storage, retrieval, and payments on the Filecoin network. Launching soon!'

const FILECOIN_FOUNDATION_URL = 'https://fil.org/'
const FIL_OZ_URL = 'https://filoz.org/'

const FOC_URLS = {
  documentation: 'https://docs.filecoin.cloud',
  filecoinPay: 'https://pay.filecoin.cloud',
  social: {
    telegram: 'https://t.me/+Xj6_zTPfcUA4MGQ1',
    slack: 'https://filecoinproject.slack.com/archives/C07CGTXHHT4',
  },
  warmStorageService: {
    contactSourceCode:
      'https://github.com/FilOzone/filecoin-services/tree/main/service_contracts/src',
    sourceCode:
      'https://github.com/FilOzone/filecoin-services/blob/main/service_contracts/src/FilecoinWarmStorageService.sol',
    spDocumentation: 'https://docs.filecoin.io/storage-providers/pdp/',
    synapseSdk: 'https://github.com/FilOzone/synapse-sdk',
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
  FIL_OZ_URL,
  FOC_URLS,
  ORGANIZATION_NAME,
  METADATA,
}
