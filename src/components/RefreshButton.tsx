import type { Button } from '@filecoin-foundation/ui-filecoin/Button'
import { RefreshButton as SharedRefreshButton } from '@filecoin-foundation/ui-filecoin/RefreshButton'
import type { ComponentProps } from 'react'

import { BASE_DOMAIN } from '@/constants/site-metadata'

// #todo: Refactor with imported type from UI-Filecoin
type RefreshButtonProps = Pick<
  ComponentProps<typeof Button>,
  'onClick' | 'disabled'
>

export function RefreshButton(props: RefreshButtonProps) {
  return <SharedRefreshButton {...props} baseDomain={BASE_DOMAIN} />
}
