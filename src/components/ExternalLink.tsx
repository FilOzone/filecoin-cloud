import { clsx } from 'clsx'
import { ComponentProps } from 'react'
import { PRODUCTION_URL } from '@/constants/links'

type ExternalLinkProps = ComponentProps<'a'>

export function ExternalLink({ className, href, ...rest }: ExternalLinkProps) {
  return (
    <a
      {...rest}
      href={`${href}?utm_source=${PRODUCTION_URL}`}
      rel="noopener noreferrer"
      className={clsx(className, 'focus:brand-outline')}
    />
  )
}
