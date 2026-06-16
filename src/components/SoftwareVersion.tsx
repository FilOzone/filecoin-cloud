import { ExternalTextLink } from '@filecoin-foundation/ui-filecoin/TextLink/ExternalTextLink'
import { formatDateTime } from '@filecoin-foundation/ui-filecoin/utils'

import { CURIO_GITHUB_URL } from '@/constants/github-urls'
import { parseSoftwareVersion } from '@/utils/parse-software-version'

type SoftwareVersionProps = {
  info: string
}

/**
 * Renders a parsed Curio version string. This mirrors the markup of
 * `@filecoin-foundation/ui-filecoin`'s `SoftwareVersion`, but uses the local
 * prerelease-aware parser so builds like `1.28.2-rc1` display correctly until
 * the upstream parser fix ships (see `@/utils/parse-software-version`).
 */
export function SoftwareVersion({ info }: SoftwareVersionProps) {
  const match = parseSoftwareVersion(info)

  if (!match) {
    return <p>The software version could not be parsed.</p>
  }

  const { version, network, commit, date } = match
  const formattedDate = date ? formatDateTime(date) : null

  return (
    <div className="space-y-0.5 text-sm text-gray-600">
      {version && network && <p>{`${version} (${network})`}</p>}
      {commit && (
        <p>
          commit{' '}
          <ExternalTextLink href={`${CURIO_GITHUB_URL}${commit}`}>
            {commit}
          </ExternalTextLink>
        </p>
      )}
      {formattedDate && <p>{formattedDate}</p>}
    </div>
  )
}
