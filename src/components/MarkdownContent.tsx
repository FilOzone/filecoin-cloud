import {
  MarkdownContent as SharedMarkdownContent,
  type MarkdownContentProps as SharedMarkdownContentProps,
} from '@filecoin-foundation/ui-filecoin/Markdown/MarkdownContent'

import { BASE_DOMAIN } from '@/constants/site-metadata'

export type MarkdownContentProps = Omit<
  SharedMarkdownContentProps,
  'baseDomain' | 'MarkdownLinkComponent'
>

export function MarkdownContent({ children }: MarkdownContentProps) {
  return (
    <SharedMarkdownContent baseDomain={BASE_DOMAIN}>
      {children}
    </SharedMarkdownContent>
  )
}
