import { getMarkdownSlugs, readMarkdownFile } from '@/utils/markdown'

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
  const filePath = path.join(OPEN_REQUESTS_DIR, `${slug}.md`)

  try {
    return readMarkdownFile<RFSFrontmatter>(filePath)
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
      const filePath = path.join(OPEN_REQUESTS_DIR, `${slug}.md`)

      try {
        const { data } = readMarkdownFile<RFSFrontmatter>(filePath)
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
