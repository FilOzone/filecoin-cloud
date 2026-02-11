import matter from 'gray-matter'

import fs from 'node:fs'
import path from 'node:path'

export type MarkdownFile<T = Record<string, unknown>> = {
  content: string
  data: T
}

/**
 * Gets slugs from markdown files in a directory (for static params generation)
 * @param directoryPath - Absolute path to the directory containing markdown files
 * @returns Array of slugs (filenames without .md extension)
 */
export function getMarkdownSlugs(directoryPath: string): string[] {
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

/**
 * Reads and parses a markdown file from the filesystem
 * @param filePath - Absolute path to the markdown file
 * @returns Parsed markdown with frontmatter data and content
 */
export function readMarkdownFile<T = Record<string, unknown>>(
  filePath: string,
): MarkdownFile<T> {
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    data: data as T,
    content,
  }
}

/**
 * Reads multiple markdown files from a directory
 * @param directoryPath - Absolute path to the directory containing markdown files
 * @param fileNames - Optional array of specific filenames to read (e.g., ['rfs-1.md', 'rfs-2.md'])
 * @returns Array of parsed markdown files
 */
export function readMarkdownFiles<T = Record<string, unknown>>(
  directoryPath: string,
  fileNames?: string[],
): MarkdownFile<T>[] {
  const files =
    fileNames ||
    fs.readdirSync(directoryPath).filter((file) => file.endsWith('.md'))

  return files.map((fileName) => {
    const filePath = path.join(directoryPath, fileName)
    return readMarkdownFile<T>(filePath)
  })
}
