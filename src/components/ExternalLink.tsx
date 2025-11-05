import { clsx } from 'clsx'
import type { ComponentProps } from 'react'

export type ExternalLinkProps = { href: string } & Omit<
  ComponentProps<'a'>,
  'href' | 'target' | 'rel'
>

export function ExternalLink({ className, ...rest }: ExternalLinkProps) {
  return (
    <a
      className={clsx(
        className,
        'focus:outline-none focus:brand-outline focus-visible:brand-outline',
      )}
      {...rest}
      target="_blank"
      rel="noopener noreferrer"
    />
  )
}
