import { parseVersionString } from '@filecoin-foundation/ui-filecoin/Table/SoftwareVersion'

import type { ServiceProvider } from '@/schemas/provider-schema'

import { CURIO_GITHUB_URL } from '../constants/providers'

export type MapProviderToCsvRowProps = {
  provider: ServiceProvider
}

export function mapProviderToCsvRow({ provider }: MapProviderToCsvRowProps) {
  const versionInfo = parseVersionString(provider.softwareVersion || '')

  const gitCommitUrl = versionInfo?.commit
    ? `${CURIO_GITHUB_URL}${versionInfo.commit}`
    : '-'

  return {
    ID: String(provider.id),
    Provider: provider.name,
    'Provider Address': provider.serviceProviderAddress,
    'Service URL': provider.serviceUrl,
    'Provider Description': provider.description,
    'Version Number': versionInfo?.version || '-',
    Network: versionInfo?.network || '-',
    'Git Commit': versionInfo?.commit || '-',
    'Git Commit URL': gitCommitUrl,
    'Build Date': versionInfo?.date || '-',
    Status: provider.serviceStatus?.toUpperCase() || '-',
    Location: provider.location,
    'Capacity (TiB)': provider.capacityTb ? String(provider.capacityTb) : '-',
    'Proving Period (Epochs)': provider.minProvingPeriod
      ? String(provider.minProvingPeriod)
      : '-',
    IPNI: provider.ipniIpfs ? 'Yes' : 'No',
    'Peer ID': provider.peerId || '-',
  }
}
