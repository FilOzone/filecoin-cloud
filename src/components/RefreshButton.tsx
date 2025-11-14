import {
  RefreshButton as SharedRefreshButton,
  type RefreshButtonProps as SharedRefreshButtonProps,
} from '@filecoin-foundation/ui-filecoin/RefreshButton'

import { BASE_DOMAIN } from '@/constants/site-metadata'

export type RefreshButtonProps = Omit<SharedRefreshButtonProps, 'baseDomain'>

export function RefreshButton(props: RefreshButtonProps) {
  return <SharedRefreshButton {...props} baseDomain={BASE_DOMAIN} />
}
