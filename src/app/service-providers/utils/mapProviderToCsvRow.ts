import { parseVersionString } from '@filecoin-foundation/ui-filecoin/Table/SoftwareVersion'

import type { ServiceProvider } from '@/schemas/provider-schema'

import { CURIO_GITHUB_URL } from '../constants/providers'
import { useExplorerUrl } from '../hooks/useExplorerUrl'

export function mapProviderToCsvRow(
  provider: ServiceProvider,
): Record<string, string> {
  const versionInfo = parseVersionString(provider.softwareVersion || '')

  const gitCommitUrl = versionInfo?.commit
    ? `${CURIO_GITHUB_URL}${versionInfo.commit}`
    : '-'

  const { explorerUrl } = useExplorerUrl()

  return {
    ID: String(provider.id),
    Provider: provider.name,
    'Provider Address': `${explorerUrl}${provider.serviceProviderAddress}`,
    'Service URL': provider.serviceUrl.toString(),
    'Provider Description': provider.description,
    'Version Number': versionInfo?.version || '-',
    Network: versionInfo?.network || '-',
    'Git Commit': versionInfo?.commit || '-',
    'Git Commit URL': gitCommitUrl,
    'Build Date': versionInfo?.date || '-',
    Status: provider.serviceStatus?.toUpperCase() || '-',
    Location: provider.location,
    'Capacity (TiB)': provider.capacityTb
      ? Number(provider.capacityTb).toLocaleString('en-US')
      : '-',
    'Proving Period (Epochs)': Number(provider.minProvingPeriod).toLocaleString(
      'en-US',
    ),
    IPNI: provider.ipniIpfs ? 'Yes' : 'No',
    'Peer ID': provider.peerId || '-',
  }
}
