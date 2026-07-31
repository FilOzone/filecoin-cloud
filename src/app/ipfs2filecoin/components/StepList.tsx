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
    <ol className="grid gap-10 md:grid-cols-2 md:gap-x-15">
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
