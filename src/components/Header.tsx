import Link from 'next/link'

import Logo from '@/public/foc-logo.svg'

import { Container } from './Container'
import { Icon } from './Icon'

export function Header() {
  return (
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
  )
}
