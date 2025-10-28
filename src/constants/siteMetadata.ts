import type { Metadata } from 'next'

const BASE_DOMAIN = 'www.filecoin.cloud'
const BASE_URL = `https://${BASE_DOMAIN}`
const ORGANIZATION_NAME = 'FilOz'

const META_TITLE = 'Filecoin Onchain Cloud'
const META_DESCRIPTION =
  'Filecoin Onchain Cloud provides transparent storage, retrieval, and payments on the Filecoin network. Launching soon!'

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

export { BASE_DOMAIN, BASE_URL, ORGANIZATION_NAME, METADATA }
