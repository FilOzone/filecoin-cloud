export const AGENTS_SEO = {
  title: 'AI Agent Startup Requests | Filecoin Onchain Cloud',
  description:
    'Explore Filecoin Onchain Cloud requests for startups building AI agent infrastructure for autonomous storage, payments, identity, coordination, and markets.',
} as const

const META_DESCRIPTION_MAX_LENGTH = 160
const ELLIPSIS = '...'

type RFSSEOParams = {
  id: string
  title: string
  description: string
}

export function getRFSSeo({ id, title, description }: RFSSEOParams) {
  return {
    title: `RFS-${id}: ${title} | Filecoin Cloud`,
    description: createMetaDescription(description),
  }
}

function createMetaDescription(description: string) {
  if (description.length <= META_DESCRIPTION_MAX_LENGTH) {
    return description
  }

  const truncated = description.slice(
    0,
    META_DESCRIPTION_MAX_LENGTH - ELLIPSIS.length,
  )
  const lastSentence = truncated.lastIndexOf('. ')

  if (lastSentence > 90) {
    return truncated.slice(0, lastSentence + 1)
  }

  const lastSpace = truncated.lastIndexOf(' ')

  return `${truncated.slice(0, lastSpace)}${ELLIPSIS}`
}
