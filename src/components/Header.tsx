'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Logo from '@/public/foc-logo.svg'

import { Banner } from './Banner'
import { Container } from './Container'
import { ExternalTextLink } from './ExternalTextLink'
import { Icon } from './Icon'

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
          <Link
            href="/"
            aria-label="Go to homepage"
            className="focus:brand-outline inline-block p-1"
          >
            <Icon component={Logo} width={40} />
          </Link>
        </Container>
      </nav>
    </>
  )
}
