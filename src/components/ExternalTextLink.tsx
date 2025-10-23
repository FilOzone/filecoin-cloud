import { ExternalLink, type ExternalLinkProps } from './ExternalLink'

type ExternalTextLinkProps = Omit<ExternalLinkProps, 'className'>

export function ExternalTextLink(props: ExternalTextLinkProps) {
  return (
    <ExternalLink
      {...props}
      className="text-brand-500 focus:brand-outline inline-block hover:underline"
    />
  )
}
