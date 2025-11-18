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
