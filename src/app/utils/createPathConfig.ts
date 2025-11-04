import type { StaticPath } from '@/constants/paths'

type PathConfig = {
  path: string
  label: string
}

const HIDDEN_PASSWORD = 'focitshipit'

function transformPathToHidden(path: StaticPath): string {
  return `/hidden${path}?password=${HIDDEN_PASSWORD}`
}

export function createPathConfig(path: StaticPath, label: string): PathConfig {
  return {
    path: transformPathToHidden(path),
    label,
  }
}
