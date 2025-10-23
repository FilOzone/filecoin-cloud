import { Accordion } from './Accordion'
import { Container } from './Container'

type FAQProps = {
  questions: Array<{ question: string; answer: string }>
}

export function FAQ({ questions }: FAQProps) {
  return (
    <div className="bg-zinc-950">
      <Container>
        {/* To be replaced with Header component once we migrate filecoin-site UI */}
        <h2 className="text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
          Frequently asked questions
        </h2>
        <dl className="mt-16 divide-y divide-white/20">
          {questions.map(({ question, answer }) => (
            <Accordion key={question} title={question} description={answer} />
          ))}
        </dl>
      </Container>
    </div>
  )
}
