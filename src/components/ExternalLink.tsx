import { clsx } from 'clsx'
import { ComponentProps } from 'react'

type ExternalLinkProps = ComponentProps<'a'>

export function ExternalLink({ className, href, ...rest }: ExternalLinkProps) {
  return (
    <a
      {...rest}
      href={`${href}?utm_source=${process.env.VERCEL_PROJECT_PRODUCTION_URL}`}
      rel="noopener noreferrer"
      className={clsx(className, 'focus:brand-outline')}
    />
  )
}
