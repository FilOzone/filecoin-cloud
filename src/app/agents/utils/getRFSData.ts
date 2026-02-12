import { getMarkdownSlugs, readMarkdownFile } from '@/utils/markdown'
import { validateSlugAndGetPath } from '@/utils/path-validation'

import path from 'node:path'

export const OPEN_REQUESTS_DIR = path.join(
  process.cwd(),
  'src/app/agents/data/open-requests',
)

type RFSFrontmatter = {
  id: string
  title: string
  description: string
}

export function getRFSData(slug: string) {
  const filePath = validateSlugAndGetPath(slug, OPEN_REQUESTS_DIR)

  if (!filePath) {
    return null
  }

  try {
    return readMarkdownFile<RFSFrontmatter>(filePath, {
      allowedDirectory: OPEN_REQUESTS_DIR,
    })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`Failed to read RFS file ${slug}:`, error)
    }
    return null
  }
}

export function getAllRFSData() {
  const slugs = getMarkdownSlugs(OPEN_REQUESTS_DIR)

  return slugs
    .map((slug) => {
      const filePath = validateSlugAndGetPath(slug, OPEN_REQUESTS_DIR)

      if (!filePath) {
        return null
      }

      try {
        const { data } = readMarkdownFile<RFSFrontmatter>(filePath, {
          allowedDirectory: OPEN_REQUESTS_DIR,
        })
        return { ...data, slug }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error(`Failed to read RFS file ${slug}:`, error)
        }
        return null
      }
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)
    .sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10))
}
