import type { ShowcaseCardData } from '@/components/ShowcaseCard'

export const agentResources = [
  {
    title: 'FOC CLI',
    description:
      'Stores files on Filecoin Onchain Cloud from the terminal or inside an agent. It manages wallets, USDFC funding, datasets, and uploads on the Synapse SDK, and ships an MCP mode for agents.',
    badge: { text: 'CLI', variant: 'solid' },
    primary: {
      href: 'https://www.npmjs.com/package/foc-cli',
      label: 'View on npm',
    },
    source: {
      href: 'https://github.com/FIL-Builders/foc-cli',
      label: 'View code',
    },
  },
  {
    title: 'FOC Storage MCP Server',
    description:
      'A Model Context Protocol server that gives AI assistants Filecoin storage. Agents upload files, manage datasets, deposit USDFC, and pick providers over MCP.',
    badge: { text: 'MCP server', variant: 'solid' },
    primary: {
      href: 'https://www.npmjs.com/package/@fil-b/foc-storage-mcp',
      label: 'View on npm',
    },
    source: {
      href: 'https://github.com/FIL-Builders/foc-storage-mcp',
      label: 'View code',
    },
  },
  {
    title: 'FOC Agent Skills',
    description:
      'Two installable skills that ship with the FOC CLI. One runs storage and payment operations such as uploads, datasets, and USDFC funding; the other searches the FOC docs so agents can look up references before they build.',
    badge: { text: 'Agent skills', variant: 'solid' },
    source: {
      href: 'https://github.com/FIL-Builders/foc-cli/tree/main/skills',
      label: 'View code',
    },
  },
] as const satisfies Array<ShowcaseCardData>
