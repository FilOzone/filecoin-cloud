'use client'

import { Icon } from '@filecoin-foundation/ui-filecoin/Icon'
import { CheckIcon, CopyIcon } from '@phosphor-icons/react/dist/ssr'
import { usePlausible } from 'next-plausible'

import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'

import { buildAgentPrompt, PLAUSIBLE_EVENTS } from '../constants/migration'

type AgentPromptProps = {
  /** Where on the page the prompt was copied from, so the two spots stay distinguishable. */
  source: 'verdict' | 'agent-door'
  /**
   * The user's checked list. When present it is inlined into the prompt so the
   * copied line carries the actual CIDs instead of pointing at a cids.txt the
   * user would have to assemble themselves.
   */
  cids?: ReadonlyArray<string>
}

export function AgentPrompt({ source, cids }: AgentPromptProps) {
  const { copy, isCopied } = useCopyToClipboard()
  const plausible = usePlausible()

  const prompt = buildAgentPrompt(cids)

  async function handleCopy() {
    const copied = await copy(prompt)

    if (copied) {
      plausible(PLAUSIBLE_EVENTS.promptCopied, {
        props: { source, cidCount: cids?.length ?? 0 },
      })
    }
  }

  return (
    <div className="relative">
      <code className="block max-h-48 overflow-y-auto whitespace-pre-wrap rounded-lg border border-(--color-border-muted) bg-(--color-card-background) p-3 pr-12 font-mono text-(--color-paragraph-text) text-xs/relaxed">
        {prompt}
      </code>

      <button
        type="button"
        onClick={handleCopy}
        aria-label={isCopied ? 'Prompt copied' : 'Copy prompt'}
        className="focus-visible:brand-outline absolute top-2 right-2 rounded-md border border-(--color-border-muted) bg-(--color-card-background) p-1.5 text-(--color-paragraph-text) hover:text-(--color-text-base)"
      >
        <Icon component={isCopied ? CheckIcon : CopyIcon} size={16} />
      </button>

      <span aria-live="polite" className="sr-only">
        {isCopied ? 'Prompt copied to clipboard' : ''}
      </span>
    </div>
  )
}
