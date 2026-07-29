export const steps = [
  {
    number: '01',
    title: 'Hand over the list',
    description:
      'Give your agent a cids.txt, or paste a list here first to see what you are dealing with. Checking costs nothing.',
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
      'Connect a wallet, deposit USDFC, approve spending. Use a wallet you keep for this and deposit what the migration needs, because that amount is also the most anything can spend.',
  },
  {
    number: '04',
    title: 'Migrate',
    description:
      'Storage providers pull the data and commit it onchain. You get a receipt, explorer links, and a manifest of everything that landed.',
  },
] as const
