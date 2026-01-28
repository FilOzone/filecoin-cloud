/**
 * Sync Contract Addresses Script
 *
 * Compares local deployments.json with upstream deployments.json from
 * FilOzone/filecoin-services repository.
 *
 * If differences are found, updates the local file with upstream content.
 *
 * Usage:
 *   npx tsx scripts/sync-contract-addresses.ts [--check]
 *
 * Options:
 *   --check  Only check for differences, don't update files (exit code 1 if different)
 */

import { z } from 'zod'

import * as fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import {
  type Deployments,
  deploymentsSchema,
} from '../src/schemas/deployments-schema'

const UPSTREAM_URL =
  'https://raw.githubusercontent.com/FilOzone/filecoin-services/main/service_contracts/deployments.json'

const LOCAL_PATH = fileURLToPath(
  new URL('../src/config/deployments.json', import.meta.url),
)

interface Diff {
  chainId: string
  field: string
  local: string
  upstream: string
}

async function fetchUpstream(): Promise<Deployments> {
  const response = await fetch(UPSTREAM_URL)
  if (!response.ok) {
    throw new Error(
      `Failed to fetch: ${response.status} ${response.statusText}`,
    )
  }
  const data = await response.json()

  try {
    return deploymentsSchema.parse(data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Upstream data validation failed:')
      console.error(error.issues)
      throw new Error('Upstream deployments.json has invalid format or data')
    }
    throw error
  }
}

function readLocal(): Deployments {
  if (!fs.existsSync(LOCAL_PATH)) {
    throw new Error(`Local deployments.json not found: ${LOCAL_PATH}`)
  }
  const data = JSON.parse(fs.readFileSync(LOCAL_PATH, 'utf-8'))

  // Validate structure but preserve all fields for comparison
  deploymentsSchema.parse(data)

  // Return raw data to preserve extra fields for bidirectional comparison
  return data as Deployments
}

function compareDeployments(local: Deployments, upstream: Deployments): Diff[] {
  const diffs: Diff[] = []
  const allChainIds = new Set([
    ...Object.keys(upstream),
    ...Object.keys(local),
  ]) as Set<keyof Deployments>

  for (const chainId of allChainIds) {
    const upstreamChain = upstream[chainId]
    const localChain = local[chainId]

    // Case 1: Chain exists in only one side (local or upstream)
    if (!localChain || !upstreamChain) {
      const existingChain = localChain || upstreamChain
      for (const [key, value] of Object.entries(existingChain)) {
        if (key !== 'metadata' && typeof value === 'string') {
          diffs.push({
            chainId,
            field: key,
            local: localChain ? value : '(missing)',
            upstream: upstreamChain ? value : '(missing)',
          })
        }
      }
      continue
    }

    // Case 2: Chain exists in both - compare fields bidirectionally
    if (localChain && upstreamChain) {
      const allFields = new Set([
        ...Object.keys(upstreamChain),
        ...Object.keys(localChain),
      ])

      for (const key of allFields) {
        if (key === 'metadata') continue

        const upstreamValue = upstreamChain[key as keyof typeof upstreamChain]
        const localValue = localChain[key as keyof typeof localChain]

        // Only compare string values (contract addresses)
        if (
          typeof upstreamValue !== 'string' &&
          typeof localValue !== 'string'
        ) {
          continue
        }

        if (localValue !== upstreamValue) {
          diffs.push({
            chainId,
            field: key,
            local: typeof localValue === 'string' ? localValue : '(missing)',
            upstream:
              typeof upstreamValue === 'string' ? upstreamValue : '(missing)',
          })
        }
      }
    }
  }

  return diffs
}

function formatDiffs(diffs: Diff[]): string {
  if (diffs.length === 0) return ''

  const lines: string[] = []

  // Group diffs by chainId manually (Node 20 compatible)
  const byChain = new Map<string, Diff[]>()
  for (const diff of diffs) {
    const existing = byChain.get(diff.chainId) || []
    existing.push(diff)
    byChain.set(diff.chainId, existing)
  }

  for (const [chainId, chainDiffs] of byChain) {
    const networkName =
      chainId === '314'
        ? 'Mainnet'
        : chainId === '314159'
          ? 'Calibration'
          : chainId
    lines.push(`\n### ${networkName} (Chain ID: ${chainId})`)
    lines.push('')
    lines.push('| Field | Local | Upstream |')
    lines.push('|-------|-------|----------|')
    for (const diff of chainDiffs) {
      lines.push(`| ${diff.field} | \`${diff.local}\` | \`${diff.upstream}\` |`)
    }
  }

  return lines.join('\n')
}

async function main(): Promise<void> {
  const checkOnly = process.argv.includes('--check')

  console.log('Fetching upstream deployments.json...')
  const upstream = await fetchUpstream()

  console.log('Reading local deployments.json...')
  const local = readLocal()

  console.log('Comparing...\n')
  const diffs = compareDeployments(local, upstream)

  if (diffs.length === 0) {
    console.log('✓ Contract addresses are in sync!')
    process.exit(0)
  }

  console.log(`Found ${diffs.length} difference(s):`)
  console.log(formatDiffs(diffs))

  if (checkOnly) {
    console.log('\n✗ Contract addresses are out of sync (check mode)')
    process.exit(1)
  }

  // Update local file with upstream content
  console.log('\nUpdating local deployments.json...')
  fs.writeFileSync(LOCAL_PATH, `${JSON.stringify(upstream, null, 2)}\n`)
  console.log('✓ Local deployments.json updated!')

  process.exit(0)
}

main().catch((err) => {
  console.error('Error:', err.message)
  process.exit(1)
})
