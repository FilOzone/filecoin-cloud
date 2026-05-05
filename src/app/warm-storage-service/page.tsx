import { Suspense } from 'react'
import { codeToHtml } from 'shiki'
import { twoslasher } from 'twoslash'

import { StructuredDataScript } from '@/components/StructuredDataScript'

import { PATHS } from '@/constants/paths'
import { createMetadata } from '@/utils/create-metadata'

import { WarmStorageServicesClient } from './components/WarmStorageServicesClient'
import { WARM_STORAGE_SERVICE_SEO } from './constants/seo'
import {
  SYNAPSE_CODE_SNIPPET,
  SYNAPSE_CODE_SNIPPET_TWOSLASH,
} from './data/synapse-code-snippet'
import { generateStructuredData } from './utils/generate-structured-data'

// Computed once per process — inputs are constants so there is no need to rerun per request.
function buildHighlightedCode(): Promise<string> {
  // Type-check the snippet at module load time; throws on breaking SDK changes.
  const twoslashResult = twoslasher(SYNAPSE_CODE_SNIPPET_TWOSLASH, 'ts', {
    compilerOptions: { strict: true },
  })

  if (twoslashResult.errors.length > 0) {
    throw new Error(
      `Synapse SDK code snippet has type errors:\n${twoslashResult.errors.map((e) => e.text).join('\n')}`,
    )
  }

  // Color replacements align the night-owl theme with the original design.
  return codeToHtml(SYNAPSE_CODE_SNIPPET, {
    lang: 'typescript',
    theme: 'night-owl',
  }).then((html) =>
    html
      .replaceAll('#011627', '#020203')
      .replaceAll('#C792EA', '#3296B4')
      .replaceAll('#7FDBCA', '#3296B4')
      .replaceAll('#82AAFF', '#22B095')
      .replaceAll('#FAF39F', '#22B095')
      .replaceAll('#ECC48D', '#9FD1D1')
      .replaceAll('#D9F5DD', '#9FD1D1')
      .replace(
        /font-style:italic;color:#D6DEEB/g,
        'font-style:italic;color:#087A98',
      ),
  )
}

const highlightedCodePromise = buildHighlightedCode()

export default async function WarmStorageService() {
  const highlightedCode = await highlightedCodePromise

  return (
    <>
      <StructuredDataScript
        structuredData={generateStructuredData(WARM_STORAGE_SERVICE_SEO)}
      />
      <Suspense>
        <WarmStorageServicesClient highlightedCode={highlightedCode} />
      </Suspense>
    </>
  )
}

export const metadata = createMetadata({
  title: WARM_STORAGE_SERVICE_SEO.title,
  description: WARM_STORAGE_SERVICE_SEO.description,
  path: PATHS.WARM_STORAGE_SERVICE.path,
})
