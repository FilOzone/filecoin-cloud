import { Heading } from '@filecoin-foundation/ui-filecoin/Heading'

import type { steps } from '../data/steps'

type StepListProps = {
  steps: typeof steps
}

/**
 * Not the shared `Card`: its `title` is a plain string, so the step number could
 * only ever be inlined as "01. Hand over the list". Lifting the number above the
 * title and giving it the accent colour is what makes the section read as a
 * sequence rather than four unrelated cards.
 */
export function StepList({ steps }: StepListProps) {
  return (
    // Four across on desktop so the sequence reads left to right in one pass.
    // Two-up in between, where four columns would be too narrow for the copy.
    <ol className="grid gap-10 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4 lg:gap-x-8">
      {steps.map(({ number, title, description }) => (
        <li key={title} className="space-y-3">
          <span
            aria-hidden="true"
            className="block font-heading font-medium text-3xl text-brand-600 tabular-nums"
          >
            {number}
          </span>
          <Heading tag="h3" variant="card-heading">
            {title}
          </Heading>
          <p className="text-(--color-paragraph-text)">{description}</p>
        </li>
      ))}
    </ol>
  )
}
