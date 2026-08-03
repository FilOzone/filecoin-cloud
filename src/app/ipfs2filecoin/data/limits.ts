import {
  COORDINATION_VOLUME_LABEL,
  MAX_ITEM_SIZE_LABEL,
} from '../constants/migration'

export const limits = [
  {
    title: 'Your source has to be publicly readable',
    description:
      'Each CID is fetched through a public gateway that serves verifiable content. Private pinning accounts, authenticated endpoints, and custom storage are not reachable this way, so those go through the contact form.',
  },
  {
    title: `${MAX_ITEM_SIZE_LABEL} per item`,
    description: `Individual assets larger than ${MAX_ITEM_SIZE_LABEL} cannot be moved yet, because splitting them would change their CID and that is the one thing we will not do. Large sets of small items are fine.`,
  },
  {
    title: `Past ${COORDINATION_VOLUME_LABEL}, talk to us first`,
    description:
      'Not a ceiling: there is no cap on how many CIDs an agent or the command line can migrate. But a run that size is worth agreeing with storage providers up front, so capacity and timing are arranged before you start rather than discovered partway through.',
  },
  {
    title: 'Filecoin uses its own identifier underneath',
    description:
      'Filecoin tracks storage under its own piece identifier, and your run produces a manifest mapping every IPFS CID to it. You never need that identifier to read your data, because retrieval is always by your original CID.',
  },
  {
    title: 'Unreachable CIDs are reported, not hidden',
    description:
      'If a CID cannot be fetched from any gateway you provided, the run tells you which ones and how many, and the manifest records them. A count you can act on beats a silent partial success.',
  },
] as const
