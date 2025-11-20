import type { Metadata } from 'next'

import {
  BASE_URL,
  DEFAULT_METADATA,
  DEFAULT_SOCIAL_IMAGE,
  ORGANIZATION_HANDLE,
} from '@/constants/site-metadata'

type SharedSocialMetadata = {
  title?: string
  description?: string
  image?: string
}

export type MetadataParams = {
  path: `/${string}`
  title: string
  description: string
  image?: string
  openGraph?: SharedSocialMetadata & {
    type?: 'website'
    locale?: string
  }
  twitter?: SharedSocialMetadata & {
    card?: 'summary' | 'summary_large_image' | 'player'
    site?: string
    creator?: string
  }
}

export function createMetadata({
  title,
  description,
  path,
  image,
  openGraph = {},
  twitter = {},
}: MetadataParams) {
  const imageUrl = image || DEFAULT_SOCIAL_IMAGE
  const defaultImage = [{ url: imageUrl }]

  const {
    metadataBase,
    openGraph: defaultOpenGraph,
    twitter: defaultTwitter,
  } = DEFAULT_METADATA

  return {
    metadataBase,
    title,
    description,
    openGraph: {
      ...defaultOpenGraph,
      type: openGraph.type || 'website',
      locale: openGraph.locale || 'en_US',
      title: openGraph.title || title,
      description: openGraph.description || description,
      images: openGraph.image ? [{ url: openGraph.image }] : defaultImage,
      url: BASE_URL,
    },
    twitter: {
      ...defaultTwitter,
      card: twitter.card || 'summary_large_image',
      site: twitter.site || ORGANIZATION_HANDLE,
      creator: twitter.creator || ORGANIZATION_HANDLE,
      title: twitter.title || title,
      description: twitter.description || description,
      images: twitter.image ? [{ url: twitter.image }] : defaultImage,
    },
    alternates: {
      canonical: path,
    },
  } satisfies Metadata
}
