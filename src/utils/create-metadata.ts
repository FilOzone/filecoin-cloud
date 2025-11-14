import type { Metadata } from 'next'

import {
  BASE_URL,
  DEFAULT_SOCIAL_IMAGE,
  METADATA,
  ORGANIZATION_HANDLE,
  ORGANIZATION_NAME,
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
  path,
  title,
  description,
  image,
  openGraph = {},
  twitter = {},
}: MetadataParams) {
  const imageArray = [image || DEFAULT_SOCIAL_IMAGE]

  const {
    type = 'website',
    locale = 'en_US',
    image: openGraphImage = imageArray,
    title: ogTitle,
    description: ogDescription,
  } = openGraph

  const {
    card = 'summary_large_image',
    site = ORGANIZATION_HANDLE,
    creator = ORGANIZATION_HANDLE,
    image: twitterImage = imageArray,
    title: twitterTitle,
    description: twitterDescription,
  } = twitter

  const titleString = title

  return {
    metadataBase: METADATA.metadataBase,
    title,
    description,
    openGraph: {
      ...METADATA.openGraph,
      type,
      locale,
      title: ogTitle || titleString,
      description: ogDescription || description,
      images: openGraphImage,
      siteName: ORGANIZATION_NAME,
      url: BASE_URL,
    },
    twitter: {
      ...METADATA.twitter,
      card,
      site,
      creator,
      title: twitterTitle || titleString,
      description: twitterDescription || description,
      images: twitterImage,
    },
    alternates: {
      canonical: path,
    },
  } as const satisfies Metadata
}
