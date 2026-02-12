import path from 'node:path'

export function isPathWithinDirectory(
  filePath: string,
  allowedDirectory: string,
) {
  const resolvedPath = path.resolve(filePath)
  const resolvedDir = path.resolve(allowedDirectory)

  return resolvedPath.startsWith(resolvedDir)
}

export function validateSlugAndGetPath(
  slug: string,
  baseDir: string,
  extension = '.md',
) {
  if (!/^[a-z0-9-_]+$/i.test(slug)) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`Invalid slug format: ${slug}`)
    }
    return null
  }

  const filePath = path.join(baseDir, `${slug}${extension}`)

  if (!isPathWithinDirectory(filePath, baseDir)) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`Path traversal attempt detected: ${slug}`)
    }
    return null
  }

  return filePath
}
