import {
  ButtonRow,
  type ButtonRowProps,
} from '@filecoin-foundation/ui-filecoin/ButtonRow'
import { Heading } from '@filecoin-foundation/ui-filecoin/Heading'
import { clsx } from 'clsx'
import type { ReactNode } from 'react'

type SideBySideContentProps = {
  title: string
  cta?: ButtonRowProps['buttons']
} & (
  | { description: string | Array<string>; children?: never }
  | { children: ReactNode; description?: never }
)

const gap = 'gap-8 md:gap-16'

export function SplitSectionContent({
  title,
  description,
  children,
  cta,
}: SideBySideContentProps) {
  const descriptionArray =
    description !== undefined
      ? Array.isArray(description)
        ? description
        : [description]
      : null

  return (
    <div className={clsx('grid grid-cols-6', gap)}>
      <div className="col-span-6 lg:col-span-2 lg:pr-8">
        <Heading
          tag="h3"
          className="font-sans text-2xl/8.5 text-(--color-subheading-text-muted)"
        >
          {title}
        </Heading>
      </div>

      <div className={clsx('col-span-6 flex flex-col lg:col-span-4', gap)}>
        {descriptionArray ? (
          <div className="space-y-6">
            {descriptionArray.map((item) => (
              <p key={item} className="text-xl/7 text-pretty">
                {item}
              </p>
            ))}
          </div>
        ) : (
          <div className="prose text-xl/7 text-pretty">{children}</div>
        )}

        {cta && <ButtonRow buttons={cta} />}
      </div>
    </div>
  )
}
