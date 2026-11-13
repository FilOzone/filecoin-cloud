import type { Question } from '@/components/Faq'

export const coldStorageFaqs: Array<Question> = [
  {
    question: 'How is Cold Storage different from Warm Storage?',
    answer: (
      <>
        <p>
          Filecoin Warm Storage (FWSS) is proven continuously with Proof of Data
          Possession (PDP) and optimized for fast, frequent reads. Filecoin Cold
          Storage (FCSS) is sealed at write time and proven with Proof of
          Replication (PoRep) — it trades retrieval speed for lower cost and
          long-term durability, which is why it's built for large,
          infrequently-accessed archives rather than active workloads.
        </p>
      </>
    ),
  },
  {
    question: 'What size datasets does FCSS support?',
    answer: (
      <p>
        FCSS is built for datasets of 1TiB and up. Below that, the pricing and
        SP economics of Filecoin Warm Storage are usually a better fit.
      </p>
    ),
  },
  {
    question:
      "What's the tradeoff with a decentralized storage provider network?",
    answer: (
      <p>
        You don't pick a single vendor and negotiate a private SLA — instead,
        your archive is stored across a marketplace of independent storage
        providers. That means no single vendor can lock you in, raise prices
        unilaterally, or go out of business and take your data with it, but it
        also means less direct control over exactly which provider holds a given
        copy. For most archival use cases, that tradeoff favors resilience over
        control.
      </p>
    ),
  },
  {
    question: 'How do I get started?',
    answer: (
      <p>
        Cold Storage deals are set up directly with the FCSS team at{' '}
        clients.fcss.fidl.tech, where you can request a quote based on your
        dataset size and retention needs. Talk to our team if you'd like an
        intro first.
      </p>
    ),
  },
]
