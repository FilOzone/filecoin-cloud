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
    title: 'FOC Storage Skill',
    description:
      'An installable agent skill that wraps the FOC Storage MCP server for Clawdbot, so an agent can run Filecoin storage operations out of the box.',
    badge: { text: 'Agent skill', variant: 'solid' },
    source: {
      href: 'https://github.com/FIL-Builders/foc-storage-clawdbot-skill',
      label: 'View code',
    },
  },
] as const satisfies Array<ShowcaseCardData>
