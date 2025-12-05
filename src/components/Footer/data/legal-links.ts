import { PATHS } from '@/constants/paths'

type LegalLink = {
  label: string
  href: string
}

export const legalLinks: Array<LegalLink> = [
  {
    label: PATHS.PRIVACY_POLICY.label,
    href: PATHS.PRIVACY_POLICY.path,
  },
  { label: PATHS.TERMS_OF_USE.label, href: PATHS.TERMS_OF_USE.path },
]
