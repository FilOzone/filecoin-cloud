import type { Button } from '@filecoin-foundation/ui-filecoin/Button'
import { RefreshButton as SharedRefreshButton } from '@filecoin-foundation/ui-filecoin/RefreshButton'
import type { ComponentProps } from 'react'

import { BASE_DOMAIN } from '@/constants/site-metadata'

type RefreshButtonProps = Pick<
  ComponentProps<typeof Button>,
  'onClick' | 'disabled'
>

export function RefreshButton(props: RefreshButtonProps) {
  return <SharedRefreshButton {...props} baseDomain={BASE_DOMAIN} />
}
