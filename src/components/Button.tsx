import {
  Button as SharedButton,
  type ButtonProps as SharedButtonProps,
} from '@filecoin-foundation/ui-filecoin/Button'

import { BASE_DOMAIN } from '@/constants/site-metadata'

export type ButtonProps = Omit<
  SharedButtonProps,
  'baseDomain' | 'LinkComponent'
>

export function Button({ children, ...props }: ButtonProps) {
  return (
    <SharedButton baseDomain={BASE_DOMAIN} {...props}>
      {children}
    </SharedButton>
  )
}
