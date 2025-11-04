'use client'

import { HomeLogoLink } from '@filecoin-foundation/ui-filecoin/HomeLogoLink'
import { ExternalTextLink } from '@filecoin-foundation/ui-filecoin/TextLink/ExternalTextLink'
import { usePathname } from 'next/navigation'

import Logo from '@/public/foc-logo.svg'

import { Banner } from './Banner'
import { Container } from './Container'
import { DesktopNavigation } from './Navigation/DesktopNavigation'

export function Header() {
  const pathname = usePathname()
  const isHomepage = pathname === '/'

  return (
    <>
      {isHomepage && (
        <Banner>
          <p className="font-medium text-white">
            Happening Now: Learn more at{' '}
            <ExternalTextLink
              href="https://www.fildev.io/FDS-7"
              aria-label="Register for Fil Dev Summit #7"
            >
              Filecoin Dev Summit 7
            </ExternalTextLink>
          </p>
        </Banner>
      )}

      <nav className="py-9">
        <Container>
          <HomeLogoLink logo={Logo} height={40} />
          <DesktopNavigation />
        </Container>
      </nav>
    </>
  )
}
