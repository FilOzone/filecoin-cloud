import { CURIO_GITHUB_URL } from '@/constants/github-urls'
import type { ServiceProvider } from '@/schemas/provider-schema'
import { parseSoftwareVersion } from '@/utils/parse-software-version'

export type MapProviderToCsvRowProps = {
  provider: ServiceProvider
}

export function mapProviderToCsvRow({ provider }: MapProviderToCsvRowProps) {
  const versionInfo = parseSoftwareVersion(provider.softwareVersion || '')

  const EMPTY_VALUE = ''

  const gitCommitUrl = versionInfo?.commit
    ? `${CURIO_GITHUB_URL}${versionInfo.commit}`
    : EMPTY_VALUE

  return {
    ID: String(provider.id),
    Provider: provider.name,
    'Provider Address': provider.serviceProviderAddress,
    'Service URL': provider.serviceUrl,
    'Provider Description': provider.description,
    'Version Number': versionInfo?.version || EMPTY_VALUE,
    Network: versionInfo?.network || EMPTY_VALUE,
    'Git Commit': versionInfo?.commit || EMPTY_VALUE,
    'Git Commit URL': gitCommitUrl,
    'Build Date': versionInfo?.date || EMPTY_VALUE,
    Status: provider.serviceStatus || EMPTY_VALUE,
    Location: provider.location,
    'Capacity (TiB)': provider.capacityTb
      ? String(provider.capacityTb)
      : EMPTY_VALUE,
    'Proving Period (Epochs)': provider.minProvingPeriod
      ? String(provider.minProvingPeriod)
      : EMPTY_VALUE,
    Reachable:
      provider.reachable === undefined
        ? EMPTY_VALUE
        : provider.reachable
          ? 'True'
          : 'False',
    'Latency (ms)':
      provider.latencyMs === undefined
        ? EMPTY_VALUE
        : String(provider.latencyMs),
    IPNI: provider.ipniIpfs ? 'True' : 'False',
    'Peer ID': provider.peerId || EMPTY_VALUE,
  }
}
