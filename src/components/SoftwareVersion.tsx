import { SoftwareVersion as SharedSoftwareVersion } from '@filecoin-foundation/ui-filecoin/Table/SoftwareVersion'

import { CURIO_GITHUB_URL } from '@/app/service-providers/constants/providers'

type SoftwareVersionProps = {
  info: string
}

export function SoftwareVersion({ info }: SoftwareVersionProps) {
  return <SharedSoftwareVersion githubUrl={CURIO_GITHUB_URL} info={info} />
}
