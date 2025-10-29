import { clsx } from 'clsx'
import type { ComponentProps } from 'react'

export type ExternalLinkProps = { href: string } & Omit<
  ComponentProps<'a'>,
  'href' | 'target' | 'rel'
>

// TODO: Delete this component
export function ExternalLink({ className, ...rest }: ExternalLinkProps) {
  return (
    <a
      className={clsx(className, 'focus:brand-outline')}
      {...rest}
      target="_blank"
      rel="noopener noreferrer"
    />
  )
}
