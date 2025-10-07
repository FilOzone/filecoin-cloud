import { clsx } from 'clsx'
import { ComponentProps } from 'react'

type ExternalLinkProps = ComponentProps<'a'>

export function ExternalLink({ className, ...rest }: ExternalLinkProps) {
  return (
    <a
      {...rest}
      rel="noopener noreferrer"
      className={clsx(className, 'focus:brand-outline')}
    />
  )
}
