import { Metadata } from 'next'
import { BASE_URL } from './links'

const META_TITLE = 'Filecoin Onchain Cloud'
const META_DESCRIPTION =
  'Filecoin Onchain Cloud provides transparent storage, retrieval, and payments on the Filecoin network. Launching soon!'

export const METADATA: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: META_TITLE,
  description: META_DESCRIPTION,
  openGraph: {
    type: 'website',
    title: META_TITLE,
    description: META_DESCRIPTION,
    url: BASE_URL,
    siteName: META_TITLE,
    images: [{ url: '/background-video-poster.webp' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: META_TITLE,
    description: META_DESCRIPTION,
    images: ['/background-video-poster.webp'],
  },
}
