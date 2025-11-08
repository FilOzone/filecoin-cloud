import {
  Button as SharedButton,
  type ButtonProps as SharedButtonProps,
} from '@filecoin-foundation/filecoin-ui/Button'

import { BASE_DOMAIN } from '@/constants/siteMetadata'

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
