import path from 'node:path'

type ValidateSlugAndGetPathArgs = {
  slug: string
  baseDir: string
  extension: `.${string}`
}

export function buildFilePath({
  baseDir,
  slug,
  extension,
}: ValidateSlugAndGetPathArgs) {
  if (!/^[a-z0-9-_]+$/i.test(slug)) {
    throw new Error(`Invalid slug format: ${slug}`)
  }

  const filePath = path.join(baseDir, `${slug}${extension}`)

  if (!isPathWithinDirectory({ filePath, allowedDirectory: baseDir })) {
    console.error(`Path traversal attempt detected: ${slug}`)
  }

  return filePath
}

type IsPathWithinDirectoryArgs = {
  filePath: string
  allowedDirectory: string
}

function isPathWithinDirectory({
  filePath,
  allowedDirectory,
}: IsPathWithinDirectoryArgs) {
  const resolvedPath = path.resolve(filePath)
  const resolvedDir = path.resolve(allowedDirectory)

  return resolvedPath.startsWith(resolvedDir)
}
