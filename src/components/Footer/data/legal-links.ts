import { PATHS } from '@/constants/paths'
import { FOC_URLS } from '@/constants/site-metadata'

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
  { label: 'GitHub', href: FOC_URLS.filecoinCloud.repository },
]
