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

export default async function WarmStorageService() {
  // Type-check the code snippet at build time using twoslash.
  // If @filoz/synapse-sdk introduces breaking changes, this will throw and fail the build.
  const twoslashResult = twoslasher(SYNAPSE_CODE_SNIPPET_TWOSLASH, 'ts', {
    compilerOptions: {
      module: 99,
      target: 99,
      moduleResolution: 100,
      strict: true,
    },
  })

  if (twoslashResult.errors.length > 0) {
    throw new Error(
      `Synapse SDK code snippet has type errors:\n${twoslashResult.errors.map((e) => e.text).join('\n')}`,
    )
  }

  // Render clean syntax highlighting (without twoslash type annotations)
  // Color replacements align the night-owl theme with the original design.
  const highlightedCode = (
    await codeToHtml(SYNAPSE_CODE_SNIPPET, {
      lang: 'typescript',
      theme: 'night-owl',
    })
  )
    // Background: navy -> near-black
    .replaceAll('#011627', '#020203')
    // Keywords (import, from, await, const, if, =, {, }, ','): purple -> blue-teal
    .replaceAll('#C792EA', '#3296B4')
    // `new`, `length`: teal -> blue-teal (same as keywords)
    .replaceAll('#7FDBCA', '#3296B4')
    // Function/method calls (create, upload, prepare, encode, etc.): blue -> green-teal
    .replaceAll('#82AAFF', '#22B095')
    // `storage` property: yellow -> green-teal (same as functions)
    .replaceAll('#FAF39F', '#22B095')
    // String contents: sandy -> light teal
    .replaceAll('#ECC48D', '#9FD1D1')
    // String delimiters (""): light green -> light teal (same as strings)
    .replaceAll('#D9F5DD', '#9FD1D1')
    // Class/type references (italic Synapse, synapse, data): light gray -> dark teal
    .replace(
      /font-style:italic;color:#D6DEEB/g,
      'font-style:italic;color:#087A98',
    )

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
