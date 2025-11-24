import type { Metadata } from 'next'

const BASE_DOMAIN = 'filecoin.cloud'
const BASE_URL = `https://${BASE_DOMAIN}`
const ORGANIZATION_NAME = 'FilOz'
const ORGANIZATION_HANDLE = `@_${ORGANIZATION_NAME}`

const META_TITLE =
  'Cloud Services with Onchain Verifiability, Programmability & Ownership'
const META_DESCRIPTION =
  'Cloud services with onchain guarantees: ownership, verifiability, and programmability.'

const DEFAULT_SOCIAL_IMAGE = '/image-fallback.webp'

const FIL_BEAM_URL = 'https://filbeam.com/'
const FIL_OZ_URL = 'https://www.filoz.org/'
const FILECOIN_FOUNDATION_URL = 'https://fil.org/'

const FOC_URLS = {
  documentation: {
    home: 'https://docs.filecoin.cloud',
    gettingStarted: 'https://docs.filecoin.cloud/getting-started/',
    proofOfDataPossession:
      'https://docs.filecoin.cloud/core-concepts/pdp-overview/',
  },
  filecoinPay: 'https://pay.filecoin.cloud',
  social: {
    telegram: 'https://t.me/+Xj6_zTPfcUA4MGQ1',
    slack: 'https://filecoinproject.slack.com/?redir=%2Farchives%2FC07CGTXHHT4%3Fname%3DC07CGTXHHT4',
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

const DEFAULT_METADATA: Metadata = {
  metadataBase: new URL(BASE_URL),
  openGraph: {
    type: 'website',
    title: META_TITLE,
    description: META_DESCRIPTION,
    url: BASE_URL,
    siteName: META_TITLE,
    images: [{ url: DEFAULT_SOCIAL_IMAGE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: META_TITLE,
    description: META_DESCRIPTION,
    site: ORGANIZATION_HANDLE,
    creator: ORGANIZATION_HANDLE,
    images: [{ url: DEFAULT_SOCIAL_IMAGE }],
  },
}

export {
  BASE_DOMAIN,
  BASE_URL,
  DEFAULT_METADATA,
  DEFAULT_SOCIAL_IMAGE,
  FIL_BEAM_URL,
  FIL_OZ_URL,
  FILECOIN_FOUNDATION_URL,
  FOC_URLS,
  META_DESCRIPTION,
  META_TITLE,
  ORGANIZATION_HANDLE,
  ORGANIZATION_NAME,
}
