import fg from 'fast-glob'
import matter from 'gray-matter'

import { isPathWithinDirectory } from './path-validation'
import fs from 'node:fs'

export type MarkdownFile<T = Record<string, unknown>> = {
  content: string
  data: T
}

export async function getMarkdownSlugs(directoryPath: string) {
  const filenames = await fg('**/*.md', { cwd: directoryPath })
  return filenames.map((file) => file.replace('.md', ''))
}

export function readMarkdownFile<T = Record<string, unknown>>(
  filePath: string,
  options?: { allowedDirectory?: string },
) {
  if (options?.allowedDirectory) {
    if (!isPathWithinDirectory(filePath, options.allowedDirectory)) {
      throw new Error(
        `Security: File path ${filePath} is outside allowed directory ${options.allowedDirectory}`,
      )
    }
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    data: data as T,
    content,
  }
}
