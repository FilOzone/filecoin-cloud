import { PATHS } from '@/constants/paths'
import type { createPathConfig } from '@/utils/create-path-config'

type PathConfig = ReturnType<typeof createPathConfig>

type LegalLink = {
  label: PathConfig['label']
  href: PathConfig['path']
}

export const legalLinks: Array<LegalLink> = [
  {
    label: PATHS.PRIVACY_POLICY.label,
    href: PATHS.PRIVACY_POLICY.path,
  },
  { label: PATHS.TERMS_OF_USE.label, href: PATHS.TERMS_OF_USE.path },
]
