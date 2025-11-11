import type { StaticPath } from '@/constants/paths'

type PathConfig = {
  path: string
  label: string
}

export function createPathConfig(path: StaticPath, label: string): PathConfig {
  return {
    path,
    label,
  }
}

// TODO: Delete this function and use the createPathConfig function instead
export function createHiddenPathConfig(
  path: StaticPath,
  label: string,
): PathConfig {
  return {
    path: transformPathToHidden(path),
    label,
  }
}

function transformPathToHidden(path: StaticPath): string {
  return `/hidden${path}?password=${process.env.NEXT_PUBLIC_HIDDEN_PASSWORD}`
}
