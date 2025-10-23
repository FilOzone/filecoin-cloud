import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { CaretDownIcon } from '@phosphor-icons/react/dist/ssr'

import { Icon } from './Icon'

type AccordionProps = {
  title: string
  description: string
}

export function Accordion({ title, description }: AccordionProps) {
  return (
    <Disclosure key={title} as="div" className="py-6 first:pt-0 last:pb-0">
      <dt>
        <DisclosureButton className="group flex w-full items-start justify-between text-left text-zinc-50 py-2">
          <span className="text-xl font-medium">{title}</span>
          <span className="group-data-open:rotate-180 transition-transform">
            <Icon component={CaretDownIcon} width={20} />
          </span>
        </DisclosureButton>
      </dt>
      <DisclosurePanel
        transition
        as="dd"
        className="pr-12 origin-top transition duration-200 ease-out data-closed:-translate-y-6 data-closed:opacity-0"
      >
        <p className="text-zinc-200">{description}</p>
      </DisclosurePanel>
    </Disclosure>
  )
}
