import { z } from 'zod'

import { getMarkdownSlugs, readMarkdownFile } from '@/utils/markdown'
import { validateSlugAndGetPath } from '@/utils/path-validation'

import path from 'node:path'
import { RFSFrontmatterSchema } from '../schemas/rfs-frontmatter'

export const OPEN_REQUESTS_DIR = path.join(
  process.cwd(),
  'src/app/agents/data/open-requests',
)

export function getRFSData(slug: string) {
  const filePath = validateSlugAndGetPath(slug, OPEN_REQUESTS_DIR)

  if (!filePath) {
    return null
  }

  try {
    const result = readMarkdownFile(filePath, {
      allowedDirectory: OPEN_REQUESTS_DIR,
    })

    const validatedData = RFSFrontmatterSchema.parse(result.data)

    return {
      ...result,
      data: validatedData,
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      if (error instanceof z.ZodError) {
        console.error(`Invalid frontmatter in ${slug}:`, error.issues)
      } else {
        console.error(`Failed to read RFS file ${slug}:`, error)
      }
    }
    return null
  }
}

export async function getAllRFSData() {
  const slugs = await getMarkdownSlugs(OPEN_REQUESTS_DIR)

  return slugs
    .map((slug) => {
      const filePath = validateSlugAndGetPath(slug, OPEN_REQUESTS_DIR)

      if (!filePath) {
        return null
      }

      try {
        const result = readMarkdownFile(filePath, {
          allowedDirectory: OPEN_REQUESTS_DIR,
        })

        const validatedData = RFSFrontmatterSchema.parse(result.data)

        return { ...validatedData, slug }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          if (error instanceof z.ZodError) {
            console.error(`Invalid frontmatter in ${slug}:`, error.issues)
          } else {
            console.error(`Failed to read RFS file ${slug}:`, error)
          }
        }
        return null
      }
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)
    .sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10))
}
