import type { Question } from '@/components/Faq'
import { MarkdownLink } from '@/components/TextLink/MarkdownLink'

import { FOC_URLS } from '@/constants/site-metadata'

export const faqs: Array<Question> = [
  {
    question: 'How do I build, test, and deploy?',
    answer: (
      <>
        <p>
          Start with the{' '}
          <MarkdownLink href={FOC_URLS.warmStorageService.synapseSdk}>
            Filecoin Synapse SDK
          </MarkdownLink>{' '}
          to access Filecoin Onchain Cloud flagship services. Upload, retrieve,
          and verify files in just a few lines of code, test everything on
          calibration, then switch to mainnet by pointing your SDK to the
          mainnet endpoint and funding your wallet.
        </p>
        <p>
          Deploy your app onchain and let the smart contracts handle proofs,
          payments, and service logic automatically.
        </p>
        <p>
          Developers can use the SDK out of the box in just a few lines of code.
        </p>
      </>
    ),
  },
  {
    question: 'Is Filecoin Onchain Cloud secure?',
    answer: (
      <>
        <p>Yes. Here's why:</p>
        <ul>
          <li>
            Your data is content-addressed — identified by its CID, not its
            location — preventing tampering or silent swaps.
          </li>
          <li>
            Proof of Data Possession (PDP) continuously proves your data is
            stored and available, with lightweight proofs generated every few
            minutes.
          </li>
          <li>
            Payments pause automatically if proofs fail, so you never pay for
            storage that isn't actually being delivered.
          </li>
          <li>
            Retrievals are independently verified through Filecoin Beam, which
            records time-to-first-byte, success rate, and egress metrics
            onchain.
          </li>
        </ul>
        <p>
          No centralized service, vendor, or operator can alter or hide these
          guarantees.
        </p>
      </>
    ),
  },
  {
    question: 'Is Filecoin Onchain Cloud interoperable with other ecosystems?',
    answer: (
      <>
        <p>Yes. The platform is built for interoperability.</p>
        <ul>
          <li>
            <strong>IPFS-compatible:</strong> Any CID can be pinned, persisted,
            or retrieved using existing IPFS tooling.
          </li>
          <li>
            <strong>Token-agnostic:</strong> Depending on service preference,
            payments can be made in FIL, USDFC (a FIL-backed USD stablecoin), or
            any ERC-20 token, allowing seamless cross-chain integrations.
          </li>
          <li>
            <strong>Open source and composable:</strong> Every building block
            can be extended or remixed to suit other ecosystems' needs.
          </li>
        </ul>
      </>
    ),
  },
  {
    question: 'What are the performance guarantees?',
    answer: (
      <>
        <p>Filecoin Onchain Cloud is built around verifiable performance:</p>
        <ul>
          <li>
            <strong>Warm storage</strong> keeps data online and accessible with
            proofs generated in minutes.
          </li>
          <li>
            <strong>Proven availability:</strong> Every provider's uptime and
            storage proofs are public and onchain.
          </li>
          <li>
            <strong>Fast delivery:</strong> Filecoin Beam provides fast
            retrievals and verified egress.
          </li>
          <li>
            <strong>Transparent rankings:</strong>{' '}
            <MarkdownLink href="https://dealbot-ga.fwss.io/">
              Storage
            </MarkdownLink>{' '}
            and{' '}
            <MarkdownLink href="https://github.com/filbeam/bot">
              retrieval
            </MarkdownLink>{' '}
            deal checkers continuously test retrievals across the network,
            executing real deals with providers to track latency, success rates,
            and throughput.{' '}
            <MarkdownLink href="https://dashboard.filbeam.com/">
              Public dashboards
            </MarkdownLink>{' '}
            ranks providers by performance, giving builders transparent
            benchmarks and helping the retrieval market' stay competitive and
            accountable.
          </li>
        </ul>
      </>
    ),
  },
  {
    question: 'Are others using Filecoin Onchain Cloud successfully?',
    answer:
      'Yes. A growing number of teams are already integrating and building on Filecoin Onchain Cloud successfully.',
  },
  {
    question: 'How much does it cost?',
    answer: (
      <>
        <ul>
          <li>
            <strong>Warm storage pricing</strong> begins at $2.50 per TiB/month
            per copy (minimum two copies).
          </li>
          <li>
            <strong>Optional retrieval via Filecoin Beam</strong> starts at
            $0.014 per GiB for fast, verified egress.
          </li>
          <li>
            You pay only for proven delivery — payments flow automatically
            through Filecoin Pay and pause the moment proofs fail.
          </li>
        </ul>
      </>
    ),
  },
  {
    question: 'How can I get involved with the community?',
    answer: (
      <>
        <p>You can join the community in a few ways:</p>
        <ul>
          <li>
            Join the{' '}
            <MarkdownLink href={FOC_URLS.social.telegram}>
              FOC Builders group on Telegram
            </MarkdownLink>{' '}
            to ask questions and get support.
          </li>
          <li>
            Jump into the{' '}
            <MarkdownLink href={FOC_URLS.social.slack}>
              #FIL-FOC channel on Filecoin Slack
            </MarkdownLink>
            .
          </li>
          <li>
            Contribute to open source tooling or fork any of the demo apps to
            build your own verifiable service.
          </li>
        </ul>
      </>
    ),
  },
]
