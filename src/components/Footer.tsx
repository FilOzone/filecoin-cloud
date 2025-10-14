import { Container } from './Container'
import { Icon } from './Icon'
import { footerLinks } from '@/constants/links'
import { ExternalLink } from './ExternalLink'

export function Footer() {
  return (
    <footer className="pt-20 pb-15 text-zinc-400">
      <Container>
        <div className="flex flex-col items-center justify-between gap-10 font-sans md:mx-10 md:flex-row">
          <div className="flex items-center gap-6">
            <p className="text-sm">Created by</p>

            {footerLinks.createdBy.map(
              ({ icon: IconComponent, url, label }) => (
                <ExternalLink
                  key={label}
                  href={url}
                  aria-label={`Visit ${label}'s website`}
                  className="p-1 hover:text-zinc-100 focus:text-zinc-100"
                >
                  <Icon component={IconComponent} width={80} />
                </ExternalLink>
              ),
            )}
          </div>

          {/* <div className="-order-1 flex items-center gap-16 md:order-1">
            {footerLinks.legal.map(({ label, url }) => (
              <ExternalLink
                key={label}
                href={url}
                className="text-sm hover:underline"
              >
                {label}
              </ExternalLink>
            ))}
          </div> */}
        </div>
      </Container>
    </footer>
  )
}
