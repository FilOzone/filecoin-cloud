import { Icon } from '@filecoin-foundation/ui-filecoin/Icon'
import { CaretDownIcon } from '@phosphor-icons/react/dist/ssr'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { clsx } from 'clsx'
import type * as React from 'react'

export function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

Accordion.Item = AccordionItem
Accordion.Trigger = AccordionTrigger
Accordion.Content = AccordionContent

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={clsx(
        'group/accordion border-b last:border-b-0 py-4',
        className,
      )}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={clsx(
          'focus-visible:brand-outline flex flex-1 items-center justify-between gap-4 text-left text-lg sm:text-xl font-medium hover:underline py-4',
          className,
        )}
        {...props}
      >
        {children}
        <span className="transition-transform duration-200 group-data-[state=open]/accordion:rotate-180 text-zinc-200">
          <Icon component={CaretDownIcon} color="inherit" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down overflow-hidden text-zinc-300"
      {...props}
    >
      <div className={clsx('pb-4', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}
