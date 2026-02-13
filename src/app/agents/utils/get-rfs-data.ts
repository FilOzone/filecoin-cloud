import { getMarkdownSlugs, readMarkdownFile } from '@/utils/markdown'
import { buildFilePath } from '@/utils/path-validation'

import path from 'node:path'
import { RFSFrontmatterSchema } from '../schemas/rfs-frontmatter'

export const OPEN_REQUESTS_DIR = path.join(
  process.cwd(),
  'src/app/agents/data/open-requests',
)

export async function getRFSData(slug: string) {
  return readRFSFile(slug)
}

export async function getAllRFSData() {
  const slugs = await getMarkdownSlugs(OPEN_REQUESTS_DIR)
  const results = await Promise.all(slugs.map(getRFSData))
  return results.sort(
    (a, b) => parseInt(a.data.id, 10) - parseInt(b.data.id, 10),
  )
}

async function readRFSFile(slug: string) {
  const filePath = buildFilePath({
    baseDir: OPEN_REQUESTS_DIR,
    slug,
    extension: '.md',
  })

  const result = await readMarkdownFile(filePath)
  const validatedData = RFSFrontmatterSchema.parse(result.data)

  return {
    ...result,
    slug,
    data: validatedData,
  }
}
