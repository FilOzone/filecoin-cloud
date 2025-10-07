import Link from 'next/link'
import { Container } from './Container'
import { Icon } from './Icon'
import Logo from '@/public/foc-logo.svg'

export function Header() {
  return (
    <header className="py-9">
      <Container>
        <Link
          href="/"
          aria-label="Go to homepage"
          className="focus:brand-outline"
        >
          <Icon component={Logo} width={40} />
        </Link>
      </Container>
    </header>
  )
}
