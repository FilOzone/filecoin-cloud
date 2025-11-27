import { clsx } from 'clsx'
import type { AnchorHTMLAttributes } from 'react'

export type ExternalLinkProps = {
  href: string
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target' | 'rel'>

export function ExternalLink({ className, ...rest }: ExternalLinkProps) {
  return (
    <a
      className={clsx(className, 'focus:outline-none')}
      {...rest}
      target="_blank"
      rel="noopener noreferrer"
    />
  )
}
