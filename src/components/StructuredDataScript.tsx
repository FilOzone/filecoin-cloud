import type {
  BreadcrumbList,
  Organization,
  Service,
  Thing,
  WebPage,
  WebSite,
  WithContext,
} from 'schema-dts'

import type { SCHEMA_CONTEXT_URL } from '@/constants/structured-data'

export type WebPageGraph = {
  '@context': typeof SCHEMA_CONTEXT_URL
  '@graph': Array<WebPage | BreadcrumbList | Organization | WebSite | Service>
}

export type ServicePageGraph = {
  '@context': typeof SCHEMA_CONTEXT_URL
  '@graph': Array<Service | BreadcrumbList>
}

export type OrganizationGraph = {
  '@context': typeof SCHEMA_CONTEXT_URL
  '@graph': readonly [Organization, WebSite]
}

type StructuredDataScriptProps = {
  structuredData:
    | WithContext<Thing>
    | WebPageGraph
    | ServicePageGraph
    | OrganizationGraph
}

export function StructuredDataScript({
  structuredData,
}: StructuredDataScriptProps) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data requires dangerouslySetInnerHTML for script injection
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
