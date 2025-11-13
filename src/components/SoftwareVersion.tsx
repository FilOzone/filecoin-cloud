import { SoftwareVersion as SharedSoftwareVersion } from '@filecoin-foundation/ui-filecoin/Table/SoftwareVersion'

const CURIO_GITHUB_URL = 'https://github.com/filecoin-project/curio/commit/'

type SoftwareVersionProps = {
  info: string
}

export function SoftwareVersion({ info }: SoftwareVersionProps) {
  return <SharedSoftwareVersion githubUrl={CURIO_GITHUB_URL} info={info} />
}
