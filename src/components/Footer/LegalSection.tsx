import { LegalSection as SharedLegalSection } from '@filecoin-foundation/ui-filecoin/Footer/LegalSection'

import {
  BASE_DOMAIN,
  FIL_OZ_URL,
  FILECOIN_FOUNDATION_URL,
} from '@/constants/site-metadata'
import FilecoinFoundationLogo from '@/public/filecoin-foundation-logo.svg'
import FilozLogo from '@/public/filoz-logo.svg'

import { legalLinks } from './data/legal-links'

export function LegalSection() {
  return (
    <SharedLegalSection
      baseDomain={BASE_DOMAIN}
      legalItems={legalLinks}
      creators={[
        {
          companyName: 'FilOz',
          websiteUrl: FIL_OZ_URL,
          LogoComponent: FilozLogo,
        },
        {
          companyName: 'Filecoin Foundation',
          websiteUrl: FILECOIN_FOUNDATION_URL,
          LogoComponent: FilecoinFoundationLogo,
        },
      ]}
    />
  )
}
