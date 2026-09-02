import { MarkdownLink } from '@filecoin-foundation/ui-filecoin/Markdown/MarkdownLink'

import type { Question } from '@/components/Faq'

import { PATHS } from '@/constants/paths'

import { DOCS_GUIDE_URL, RUNBOOK_PATH } from '../constants/migration'

export const faqs: Array<Question> = [
  {
    question: 'Do my existing gateway links keep working?',
    answer: (
      <>
        <p>
          Yes. Data is stored as the CAR of the original DAG, so the CID is
          unchanged and the content stays announced to the IPFS network.
          Anything already published, whether an IPNS name, a token URI, or a
          link in a document, resolves the same way after the migration as
          before it.
        </p>
        <p>
          That holds for any public gateway, a gateway you run yourself, or a
          local node, because resolution goes through the network rather than
          through us.
        </p>
      </>
    ),
  },
  {
    question: 'Do I have to delete the data from my current provider?',
    answer: (
      <p>
        No, and we would suggest you do not until you have verified the
        migration yourself. Fetch a few of your own CIDs, check the data set ids
        the run reports against the chain, and cancel your old plan when you are
        satisfied.
      </p>
    ),
  },
  {
    question: 'What do I need before I can migrate?',
    answer: (
      <>
        <p>
          USDFC to pay for storage and a small amount of FIL for gas, in a
          wallet you control. Checking a list needs none of that, and you can
          set the rest up in one pass: connect a wallet, deposit, approve
          spending.
        </p>
        <p>
          Those are ordinary transactions you confirm one at a time. After that
          your account is ready and the migration itself can run without you
          watching it.
        </p>
      </>
    ),
  },
  {
    question: 'What happens if the run stops halfway?',
    answer: (
      <p>
        The CLI keeps its state in a local database, so an interrupted run loses
        nothing: re-run the same command and it picks up where it left off.
        Anything not yet stored is still recorded there, so a later run finishes
        it rather than starting over.
      </p>
    ),
  },
  {
    question: 'What can the agent actually spend?',
    answer: (
      <>
        <p>
          Only what you have deposited. The migration runs from a key you
          provide, and a key that can sign on your account can also draw against
          its balance, so treat the deposit as the ceiling rather than as a
          starting balance.
        </p>
        <p>
          The safe pattern is a wallet you keep for this purpose, holding the
          USDFC and FIL this migration needs and nothing else. Do not give a key
          to your main wallet to anything that runs unattended, here or
          anywhere.
        </p>
      </>
    ),
  },
  {
    question: 'How much of this can an agent actually do?',
    answer: (
      <>
        <p>
          All of the work, up to the deposit you set. The brief at{' '}
          <MarkdownLink href={RUNBOOK_PATH}>{RUNBOOK_PATH}</MarkdownLink> gives
          an agent the command sequence, the caps, and the prerequisites, and
          the tool runs headless with JSON status output so it can read its own
          progress and recover from failures.
        </p>
        <p>
          What it hands back to you are the two things that need your key: you
          put the key in a file it can pass along without reading, and you fund
          the account in your own terminal while it waits for you to confirm.
          After that it signs the migration itself, and the deposit you set is
          the ceiling on what it can spend.
        </p>
        <p>
          Rather run it yourself? The same migration is written out in the{' '}
          <MarkdownLink href={DOCS_GUIDE_URL}>
            step-by-step command-line guide
          </MarkdownLink>
          . If a migration is too large or your source is not publicly
          reachable,{' '}
          <MarkdownLink href={PATHS.CONTACT.path}>
            talk to our team
          </MarkdownLink>{' '}
          instead.
        </p>
      </>
    ),
  },
]
