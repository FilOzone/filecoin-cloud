import { ComponentProps } from 'react'

type ExternalLinkProps = ComponentProps<'a'>

export function ExternalLink(props: ExternalLinkProps) {
  return <a {...props} rel="noopener noreferrer" />
}
