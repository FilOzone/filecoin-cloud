import { MIGRATION_RUNBOOK } from '../data/migration-runbook'

/**
 * The executable runbook an agent follows end to end. Served as markdown so an
 * agent that fetches it gets the procedure verbatim rather than a rendered page.
 */
export function GET() {
  return new Response(MIGRATION_RUNBOOK, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  })
}
