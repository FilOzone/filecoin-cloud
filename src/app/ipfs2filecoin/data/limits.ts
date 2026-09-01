import {
  COORDINATION_VOLUME_LABEL,
  MAX_ITEM_SIZE_LABEL,
} from '../constants/migration'

export const limits = [
  {
    title: 'Your source has to be publicly readable',
    description:
      'Each CID has to be retrievable from the public IPFS network; the migration fetches it through a public gateway that serves verifiable content. Private pinning accounts, authenticated endpoints, and custom storage are not reachable this way, so those go through the contact form.',
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
      'Filecoin tracks storage under its own piece identifier. You never need it to read your data, because retrieval is always by your original CID, and what the run hands you is the data set ids and the transaction links to verify onchain.',
  },
  {
    title: 'Unreachable CIDs are reported, not hidden',
    description:
      'If a CID cannot be fetched from any gateway you provided, the run names them and counts them, and they stay recorded so a later run can retry them. A count you can act on beats a silent partial success.',
  },
] as const
