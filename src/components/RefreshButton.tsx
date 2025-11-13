import {
  RefreshButton as SharedRefreshButton,

} from '@filecoin-foundation/ui-filecoin/RefreshButton'
import { BASE_DOMAIN } from '@/constants/site-metadata'
import type { ComponentProps } from 'react'
import { Button } from '@filecoin-foundation/ui-filecoin/Button'


type RefreshButtonProps = Pick<
  ComponentProps<typeof Button>,
  'onClick' | 'disabled'
>

export function RefreshButton(props: RefreshButtonProps) {
  return (
    <SharedRefreshButton
      {...props}
      baseDomain={BASE_DOMAIN}
    />
  )
}
