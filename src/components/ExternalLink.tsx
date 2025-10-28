import { clsx } from 'clsx'
import type { ComponentProps } from 'react'

import { BASE_DOMAIN } from '@/constants/siteMetadata'

export type ExternalLinkProps = { href: string } & Omit<
  ComponentProps<'a'>,
  'href' | 'rel' | 'target'
>

export function ExternalLink({ className, href, ...rest }: ExternalLinkProps) {
  return (
    <a
      {...rest}
      href={`${href}?utm_source=${BASE_DOMAIN}`}
      rel="noopener noreferrer"
      className={clsx(className, 'focus:brand-outline')}
      target="_blank"
    />
  )
}
