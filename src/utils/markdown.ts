import fg from 'fast-glob'
import matter from 'gray-matter'

import fs from 'node:fs/promises'

export async function getMarkdownSlugs(
  directoryPath: string,
): Promise<string[]> {
  const filenames = await fg('*.md', { cwd: directoryPath })
  return filenames.map((file: string) => file.replace('.md', ''))
}

export async function readMarkdownFile(filePath: string) {
  const fileContents = await fs.readFile(filePath, 'utf8')
  const result = matter(fileContents)

  return {
    content: result.content,
    data: result.data,
  }
}
