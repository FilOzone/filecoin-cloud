'use client'

import { Button } from '@filecoin-foundation/ui-filecoin/Button'
import { usePlausible } from 'next-plausible'

import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'

import { AGENT_PROMPT, PLAUSIBLE_EVENTS } from '../constants/migration'

type AgentPromptProps = {
  /** Where on the page the prompt was copied from, so the two spots stay distinguishable. */
  source: 'verdict' | 'agent-door'
}

export function AgentPrompt({ source }: AgentPromptProps) {
  const { copy, isCopied } = useCopyToClipboard()
  const plausible = usePlausible()

  async function handleCopy() {
    const copied = await copy(AGENT_PROMPT)

    if (copied) {
      plausible(PLAUSIBLE_EVENTS.promptCopied, { props: { source } })
    }
  }

  return (
    <div className="space-y-3">
      <code className="block rounded-lg border border-(--color-border-muted) bg-(--color-card-background) p-3 font-mono text-(--color-paragraph-text) text-xs/relaxed">
        {AGENT_PROMPT}
      </code>

      <Button type="button" variant="ghost" onClick={handleCopy}>
        {isCopied ? 'Copied' : 'Copy prompt'}
      </Button>

      <span aria-live="polite" className="sr-only">
        {isCopied ? 'Prompt copied to clipboard' : ''}
      </span>
    </div>
  )
}
