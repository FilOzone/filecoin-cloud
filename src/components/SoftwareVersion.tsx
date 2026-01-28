import { SoftwareVersion as SharedSoftwareVersion } from '@filecoin-foundation/ui-filecoin/Table/SoftwareVersion'

import { CURIO_GITHUB_URL } from '@/constants/github-urls'

type SoftwareVersionProps = {
  info: string
}

export function SoftwareVersion({ info }: SoftwareVersionProps) {
  return <SharedSoftwareVersion githubUrl={CURIO_GITHUB_URL} info={info} />
}
