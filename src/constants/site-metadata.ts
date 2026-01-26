import type { Metadata } from 'next'

const BASE_DOMAIN = 'filecoin.cloud'
const BASE_URL = `https://${BASE_DOMAIN}`
const ORGANIZATION_NAME = 'FilOz'
const ORGANIZATION_HANDLE = `@_${ORGANIZATION_NAME}`

const SEO = {
  title:
    'Cloud Services with Onchain Verifiability, Programmability & Ownership',
  description:
    'Cloud services with onchain guarantees: ownership, verifiability, and programmability.',
}

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
    github: 'https://github.com/FilOzone',
    linkedIn: 'https://www.linkedin.com/company/filoz/',
    slack:
      'https://filecoinproject.slack.com/?redir=%2Farchives%2FC07CGTXHHT4%3Fname%3DC07CGTXHHT4',
    telegram: 'https://t.me/+Xj6_zTPfcUA4MGQ1',
    twitter: 'https://x.com/_FilOz',
  },
  warmStorageService: {
    contactSourceCode:
      'https://github.com/FilOzone/filecoin-services/tree/main/service_contracts/src',
    sourceCode:
      'https://github.com/FilOzone/filecoin-services/blob/main/service_contracts/src/FilecoinWarmStorageService.sol',
    spDocumentation: 'https://docs.filecoin.io/storage-providers/pdp/',
    synapseSdk: 'https://github.com/FilOzone/synapse-sdk',
    serviceProviderRegistryCode:
      'https://github.com/FilOzone/filecoin-services/blob/main/service_contracts/src/ServiceProviderRegistry.sol',
    endorsementSetCode:
      'https://github.com/FilOzone/filecoin-services/blob/main/service_contracts/src/ProviderIdSet.sol',
  },
  payments: {
    contractSourceCode:
      'https://github.com/FilOzone/filecoin-pay/tree/main/src',
    sourceCode:
      'https://github.com/FilOzone/filecoin-pay/blob/main/src/FilecoinPayV1.sol',
  },
  sessionKeyRegistry: {
    contractSourceCode:
      'https://github.com/FilOzone/SessionKeyRegistry/tree/main/src',
    sourceCode:
      'https://github.com/FilOzone/SessionKeyRegistry/blob/main/src/SessionKeyRegistry.sol',
  },
  pdp: {
    contractSourceCode: 'https://github.com/FilOzone/pdp/tree/main/src',
    sourceCode: 'https://github.com/FilOzone/pdp/tree/blob/src/PDPVerifier.sol',
  },
}

const DEFAULT_METADATA: Metadata = {
  metadataBase: new URL(BASE_URL),
  openGraph: {
    type: 'website',
    title: SEO.title,
    description: SEO.description,
    url: BASE_URL,
    siteName: SEO.title,
    images: [{ url: DEFAULT_SOCIAL_IMAGE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO.title,
    description: SEO.description,
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
  SEO,
}
