import { clsx } from 'clsx'
import type { ComponentProps } from 'react'

import { PRODUCTION_URL } from '@/constants/links'

type ExternalLinkProps = { href: string } & Omit<
  ComponentProps<'a'>,
  'href' | 'rel' | 'target'
>

export function ExternalLink({ className, href, ...rest }: ExternalLinkProps) {
  return (
    <a
      {...rest}
      href={`${href}?utm_source=${PRODUCTION_URL}`}
      rel="noopener noreferrer"
      className={clsx(className, 'focus:brand-outline')}
      target="_blank"
    />
  )
}
