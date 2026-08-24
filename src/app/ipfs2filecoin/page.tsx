import { Button } from '@filecoin-foundation/ui-filecoin/Button'
import { Card } from '@filecoin-foundation/ui-filecoin/Card'
import { CardGrid } from '@filecoin-foundation/ui-filecoin/CardGrid'
import { Heading } from '@filecoin-foundation/ui-filecoin/Heading'
import { Icon } from '@filecoin-foundation/ui-filecoin/Icon'
import { PageHeader } from '@filecoin-foundation/ui-filecoin/PageHeader'
import { PageSection } from '@filecoin-foundation/ui-filecoin/PageSection'
import { SectionContent } from '@filecoin-foundation/ui-filecoin/SectionContent'
import { ExternalTextLink } from '@filecoin-foundation/ui-filecoin/TextLink/ExternalTextLink'
import { SmartTextLink } from '@filecoin-foundation/ui-filecoin/TextLink/SmartTextLink'
import { WarningCircleIcon } from '@phosphor-icons/react/dist/ssr'
import type { Metadata } from 'next'

import { Faq } from '@/components/Faq'
import { Navigation } from '@/components/Navigation/Navigation'
import { StructuredDataScript } from '@/components/StructuredDataScript'

import { PATHS } from '@/constants/paths'
import { FOC_URLS } from '@/constants/site-metadata'
import { createMetadata } from '@/utils/create-metadata'

import { AgentPrompt } from './components/AgentPrompt'
import { CidListChecker } from './components/CidListChecker'
import { ComparisonTable } from './components/ComparisonTable'
import { CostEstimator } from './components/CostEstimator'
import { StepList } from './components/StepList'
import {
  COORDINATION_VOLUME_LABEL,
  RUNBOOK_PATH,
  USD_PER_TIB_MONTH_PER_COPY,
} from './constants/migration'
import { IPFS2FILECOIN_SEO } from './constants/seo'
import { faqs } from './data/faqs'
import { limits } from './data/limits'
import { reasons } from './data/reasons'
import { steps } from './data/steps'
import { formatUsd } from './utils/estimate-cost'
import { generateStructuredData } from './utils/generate-structured-data'

const ghostOnDark =
  '!border-zinc-50/40 !bg-transparent hover:!border-zinc-50 hover:!bg-zinc-50/5'

/**
 * `ExternalTextLink` sizes its arrow for button-style links: a fixed 16px glyph
 * set `ml-1` off the label. Inside a 14px paragraph that reads as oversized and
 * detached, so pull it in and scale it to the text. Fix belongs upstream in
 * ui-filecoin; this keeps the footnote legible until then.
 */
const inlineExternalLink = '[&>span]:ml-0.5 [&_svg]:size-3.5'

export default function IpfsToFilecoin() {
  return (
    <>
      <StructuredDataScript
        structuredData={generateStructuredData(IPFS2FILECOIN_SEO)}
      />

      <Navigation backgroundVariant="dark" />

      {/*
        Full-bleed backdrop behind the hero, following the homepage pattern: an
        `isolate relative` wrapper, an `absolute inset-0 -z-10` layer that spans
        edge to edge rather than the padded container, and `transparentDark` on
        the section so the layer shows through while text keeps its dark-section
        tokens. The base stays zinc-950 as before; a faint brand glow along the
        bottom lifts it just enough to read as lit rather than flat black, and
        carries the eye toward the section that follows. The tint is the
        --color-brand-500 token (the primary blue), mixed down to 12% so it reads
        as light on the surface, not a coloured panel.
      */}
      <div className="isolate relative">
        <div aria-hidden className="absolute inset-0 -z-10 bg-zinc-950">
          <div className="absolute inset-x-0 bottom-0 h-144 bg-[radial-gradient(60%_100%_at_50%_100%,color-mix(in_oklab,var(--color-brand-500)_12%,transparent),transparent_70%)]" />
        </div>
        <PageSection backgroundVariant="transparentDark">
          <PageHeader
            centered
            variant="highContrast"
            title="Move your pinned IPFS data to Filecoin"
            description="Same CIDs, a fraction of what pinning services charge, and an onchain receipt you can verify yourself."
          />
          <div className="mt-10">
            <CidListChecker />
          </div>
        </PageSection>
      </div>

      <PageSection backgroundVariant="gray">
        <SectionContent
          headingTag="h2"
          title="How it works"
          description="Four steps, and the first two are free."
        >
          <StepList steps={steps} />
        </SectionContent>
      </PageSection>

      <PageSection backgroundVariant="light">
        <SectionContent
          headingTag="h2"
          title="Why move to Filecoin warm storage"
          description="Your data keeps working the way it does today. What changes is the price, the proof, and who owns it."
        >
          <CardGrid as="ul" variant="lgTwoWide">
            {reasons.map(({ title, description, icon }) => (
              <Card
                key={title}
                as="li"
                title={title}
                // Card sets descriptions at text-xl/7; these reason blurbs run
                // long and read heavier than the titles at that size. Stepped
                // down per-instance so the shared Card stays untouched.
                description={
                  <span className="text-base/relaxed">{description}</span>
                }
                icon={icon}
              />
            ))}
          </CardGrid>
        </SectionContent>
      </PageSection>

      <PageSection backgroundVariant="gray">
        <SectionContent
          headingTag="h2"
          title="What it costs"
          description="Pinning services bundle an allowance into a monthly plan, then charge per gigabyte past it. Once you are past the allowance, which anyone migrating a real archive already is, the overage rate is your real cost."
        >
          {/*
            The comparison and the estimator answer one question between them:
            the table is the market rate, the card prices it for your own data.
            Paired side by side at lg so they read as two halves of "what it
            costs"; stacked below that, where a 2fr/1fr split leaves the table
            too narrow to hold its columns.
          */}
          <div className="grid gap-8 lg:grid-cols-3 lg:items-start">
            <div className="space-y-6 lg:col-span-2">
              <ComparisonTable />

              <p className="text-(--color-paragraph-text) text-sm/relaxed">
                Filecoin Warm Storage is {formatUsd(USD_PER_TIB_MONTH_PER_COPY)}{' '}
                per TiB per month per copy at two copies. Other rates are the
                published list overage rates from{' '}
                <ExternalTextLink
                  className={inlineExternalLink}
                  href="https://filebase.com/pricing/"
                >
                  Filebase
                </ExternalTextLink>{' '}
                and{' '}
                <ExternalTextLink
                  className={inlineExternalLink}
                  href="https://pinata.cloud/pricing"
                >
                  Pinata
                </ExternalTextLink>
                . Filecoin includes two replicas; the other services do not
                publish a replication factor, so the comparison is conservative.
              </p>
            </div>

            <div
              id="estimate"
              className="scroll-mt-24 rounded-xl border border-(--color-border-muted) bg-(--color-card-background-hover) p-6"
            >
              <Heading tag="h3" variant="card-heading">
                Estimate your deposit
              </Heading>
              <p className="mt-2 text-(--color-paragraph-text) text-sm/relaxed">
                Storage is prepaid for a period rather than billed monthly.
                Enter roughly how much you hold and for how long; it runs in
                your browser.
              </p>
              <div className="mt-6">
                <CostEstimator />
              </div>
            </div>
          </div>
        </SectionContent>
      </PageSection>

      <PageSection backgroundVariant="dark">
        <SectionContent
          headingTag="h2"
          title="Nobody should migrate an archive by clicking"
          description="Real migrations run unattended, so that is the path this is built around. Check a list for free, get your account funded in one pass, then hand the work to your agent or to us."
        >
          {/*
            No panels. Boxing both columns stacked three nested borders in the
            left one: panel, then code block, then a warning box inside it. One
            hairline between the columns does the same separating work, and the
            code block stays the only bordered thing because it is a surface you
            copy from rather than a container.
          */}
          <div className="grid gap-10 lg:grid-cols-3 lg:gap-14">
            <div id="agent" className="scroll-mt-24 space-y-4 lg:col-span-2">
              <Heading tag="h3" variant="card-heading">
                Ask your agent to do it
              </Heading>
              <p className="text-(--color-paragraph-text)">
                Give this line to Claude Code, Cursor, or any coding agent. It
                reads the runbook at{' '}
                <SmartTextLink href={RUNBOOK_PATH}>
                  {RUNBOOK_PATH}
                </SmartTextLink>
                , works through your list, and reports back what landed.
              </p>

              {/* The action ahead of the caveat: this is what people came for. */}
              <AgentPrompt source="agent-door" />

              {/*
                Marked with an icon and a bolded rule rather than a box. This is
                the one thing here that can cost someone real money, so it
                cannot read as a third grey paragraph, but it does not need a
                container to say so.
              */}
              <div className="flex gap-2.5">
                <span className="mt-0.5 shrink-0 text-(--color-brand-error)">
                  <Icon component={WarningCircleIcon} size={16} />
                </span>
                <p className="text-(--color-paragraph-text) text-sm/relaxed">
                  It signs from a key you provide, and a key that can sign on
                  your account can draw against its balance, so your deposit is
                  the ceiling. Use a wallet you keep for this purpose, holding
                  what this migration needs and nothing else.{' '}
                  <strong className="font-medium text-(--color-text-base)">
                    Never give a main wallet&apos;s key to something running
                    unattended.
                  </strong>
                </p>
              </div>
            </div>

            <div className="h-fit space-y-4 lg:border-(--color-border-muted) lg:border-l lg:pl-14">
              <Heading tag="h3" variant="card-heading">
                Talk to us
              </Heading>
              <p className="text-(--color-paragraph-text)">
                For sources that are not reachable from the public IPFS network,
                or to agree capacity and timing before a run over{' '}
                {COORDINATION_VOLUME_LABEL}. That is coordination, not a
                ceiling: the agent path has no cap on how many CIDs it migrates.
              </p>
              {/* Padding rather than a margin: the parent's `space-y` already
                  owns each child's margin-top, so this adds to it instead of
                  fighting it. */}
              <div className="pt-4">
                <Button
                  href={PATHS.CONTACT.path}
                  variant="ghost"
                  className={ghostOnDark}
                >
                  Tell us about your data
                </Button>
              </div>
            </div>
          </div>
        </SectionContent>
      </PageSection>

      <PageSection backgroundVariant="light">
        <SectionContent
          headingTag="h2"
          title="What this does not do"
          description="The things worth knowing up front, so nothing surprises you halfway through a run."
        >
          <dl className="max-w-5xl divide-y divide-(--color-border-muted) border-(--color-border-muted) border-t">
            {limits.map(({ title, description }) => (
              <div
                key={title}
                className="grid gap-2 py-6 md:grid-cols-3 md:gap-8"
              >
                <dt className="font-medium text-(--color-text-base)">
                  {title}
                </dt>
                <dd className="text-(--color-paragraph-text) md:col-span-2">
                  {description}
                </dd>
              </div>
            ))}
          </dl>
        </SectionContent>
      </PageSection>

      <PageSection backgroundVariant="gray">
        <Faq questions={faqs} />
      </PageSection>

      <PageSection backgroundVariant="dark">
        <PageHeader
          centered
          variant="highContrast"
          title="Find out what your archive costs before you move it"
          description="Checking is free and needs nothing but a list. You get a real number and the one line that hands the job to your agent."
          cta={[
            <Button
              key="read-the-brief"
              href={FOC_URLS.documentation.gettingStarted}
              variant="primary"
            >
              Read the docs
            </Button>,
            <Button
              key="talk-to-us"
              href={PATHS.CONTACT.path}
              variant="ghost"
              className={ghostOnDark}
            >
              Talk to us instead
            </Button>,
          ]}
        />
      </PageSection>
    </>
  )
}

const baseMetadata = createMetadata({
  title: IPFS2FILECOIN_SEO.title,
  description: IPFS2FILECOIN_SEO.description,
  path: PATHS.IPFS_TO_FILECOIN.path,
})

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    ...baseMetadata.alternates,
    /**
     * So an agent pointed at the human URL discovers the runbook without
     * being told where it lives.
     */
    types: { 'text/markdown': RUNBOOK_PATH },
  },
}
