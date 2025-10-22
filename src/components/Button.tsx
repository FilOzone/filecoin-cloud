import { type ButtonProps, Button as HeadlessUIButton } from '@headlessui/react'
import { clsx } from 'clsx'

export function Button({ className, ...rest }: ButtonProps) {
  return (
    <HeadlessUIButton
      className={clsx(
        'button',
        rest.disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className,
      )}
      {...rest}
    />
  )
}
