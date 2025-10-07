import Link from 'next/link'
import Container from './Container'
import { Icon } from './Icon'
import Logo from '@/public/foc-logo.svg'

export function Header() {
  return (
    <header className="my-9">
      <Container>
        <Link href="/" aria-label="Go to homepage">
          <Icon component={Logo} size={40} />
        </Link>
      </Container>
    </header>
  )
}
