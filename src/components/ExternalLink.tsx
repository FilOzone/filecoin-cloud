import { clsx } from 'clsx'
import type { ComponentProps } from 'react'

import { BASE_DOMAIN } from '@/constants/siteMetadata'

export type ExternalLinkProps = { href: string } & Omit<
  ComponentProps<'a'>,
  'href' | 'target' | 'rel'
>

export function ExternalLink({ className, href, ...rest }: ExternalLinkProps) {
  return (
    <a
      className={clsx(className, 'focus:brand-outline')}
      {...rest}
      href={`${href}?utm_source=${BASE_DOMAIN}`}
      target="_blank"
      rel="noopener noreferrer"
    />
  )
}
