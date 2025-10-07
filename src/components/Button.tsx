import { ComponentProps } from 'react'
import { clsx } from 'clsx'

export type ButtonProps = ComponentProps<'button'>

export function Button({ className, ...rest }: ButtonProps) {
  return (
    <button
      className={clsx(
        'button',
        rest.disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className,
      )}
      {...rest}
    />
  )
}
