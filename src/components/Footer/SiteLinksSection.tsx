import { SmartTextLink } from '@filecoin-foundation/ui-filecoin/TextLink/SmartTextLink'

import { PATHS } from '@/constants/paths'
import { FIL_BEAM_URL, FOC_URLS } from '@/constants/site-metadata'

type FooterLinkColumn = {
  title: string
  links: ReadonlyArray<{ label: string; href: string }>
}

const footerLinkColumns: ReadonlyArray<FooterLinkColumn> = [
  {
    title: 'Product',
    links: [
      { label: PATHS.STORE.label, href: PATHS.STORE.path },
      { label: 'Warm Storage', href: PATHS.WARM_STORAGE_SERVICE.path },
      { label: 'Cold Storage', href: PATHS.COLD_STORAGE_SERVICE.path },
      { label: 'Filecoin Pay', href: FOC_URLS.filecoinPay },
      { label: 'Filecoin Beam', href: FIL_BEAM_URL },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: FOC_URLS.documentation.home },
      { label: PATHS.SHOWCASE.label, href: PATHS.SHOWCASE.path },
      { label: PATHS.AGENTS.label, href: PATHS.AGENTS.path },
      { label: PATHS.SUPPORT.label, href: PATHS.SUPPORT.path },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: PATHS.CONTACT.label, href: PATHS.CONTACT.path },
      { label: 'Status', href: FOC_URLS.status },
      { label: 'GitHub', href: FOC_URLS.social.github },
    ],
  },
]

export function SiteLinksSection() {
  return (
    <nav
      aria-label="Footer"
      className="grid grid-cols-2 gap-8 pb-12 sm:grid-cols-3"
    >
      {footerLinkColumns.map(({ title, links }) => (
        <div key={title} className="flex flex-col gap-4">
          <h2 className="text-sm font-medium text-(--color-text-base)">
            {title}
          </h2>
          <ul className="flex flex-col gap-3">
            {links.map(({ label, href }) => (
              <li key={label}>
                <SmartTextLink
                  href={href}
                  className="text-sm text-(--color-paragraph-text)"
                >
                  {label}
                </SmartTextLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}
