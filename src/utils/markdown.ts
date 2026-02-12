import matter from 'gray-matter'

import { isPathWithinDirectory } from './path-validation'
import fs from 'node:fs'

export type MarkdownFile<T = Record<string, unknown>> = {
  content: string
  data: T
}

export function getMarkdownSlugs(directoryPath: string) {
  try {
    const files = fs.readdirSync(directoryPath)
    return files
      .filter((file) => file.endsWith('.md'))
      .map((file) => file.replace('.md', ''))
  } catch (error) {
    console.error(`Error reading directory ${directoryPath}:`, error)
    return []
  }
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
