import { MarkdownLink as SharedMarkdownLink } from '@filecoin-foundation/ui-filecoin/Markdown/MarkdownLink'
import type { SmartTextLinkProps } from '@filecoin-foundation/ui-filecoin/TextLink/SmartTextLink'
import Link from 'next/link'

import { BASE_DOMAIN } from '@/constants/site-metadata'

type MarkdownLinkProps = Omit<
  SmartTextLinkProps,
  'baseDomain' | 'InternalLinkComponent'
>

export function MarkdownLink(props: MarkdownLinkProps) {
  return (
    <SharedMarkdownLink
      {...props}
      baseDomain={BASE_DOMAIN}
      // @ts-expect-error: Types of property 'href' are incompatible: string vs RouteImpl | UrlObject
      InternalLinkComponent={Link}
    />
  )
}
