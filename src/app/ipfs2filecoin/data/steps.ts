export const steps = [
  {
    number: '01',
    title: 'Hand over the list',
    description:
      'Paste a list here to see what you are dealing with, or let your agent pull it straight from your pinning service, whose dashboard and API list every pinned CID. Checking costs nothing.',
  },
  {
    number: '02',
    title: 'Read and measure',
    description:
      'Each CID is fetched from a public gateway and its Filecoin piece identifier computed. Nothing is uploaded anywhere and nothing is charged.',
  },
  {
    number: '03',
    title: 'Fund it, once',
    description:
      'Deposit USDFC and approve spending, from a wallet you keep for this migration. Deposit what the run needs, because that amount is also the most anything can spend.',
  },
  {
    number: '04',
    title: 'Migrate',
    description:
      'Your machine streams the data straight to two storage providers, and the adds are committed onchain in batches. You get explorer links and a summary of everything that landed.',
  },
] as const
