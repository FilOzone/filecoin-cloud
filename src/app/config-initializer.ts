import { setUIConfig } from '@filecoin-foundation/ui-filecoin/config/ui-config'
import Link from 'next/link'

import { BASE_DOMAIN } from '@/constants/site-metadata'

setUIConfig({
  baseDomain: BASE_DOMAIN,
  Link: Link,
})

export function ConfigInitializer() {
  return null
}
