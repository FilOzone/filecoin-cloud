import { SectionContent } from '@filecoin-foundation/filecoin-ui/SectionContent'

import { Accordion } from './Accordion'

type FaqProps = {
  questions: Array<{ question: string; answer: string }>
}

export function Faq({ questions }: FaqProps) {
  return (
    <SectionContent title="Frequently asked questions">
      <Accordion type="single" collapsible className="divide-y divide-white/20">
        {questions.map(({ question, answer }) => {
          return (
            <Accordion.Item key={question} value={question} className="py-4">
              <Accordion.Trigger>{question}</Accordion.Trigger>
              <Accordion.Content>{answer}</Accordion.Content>
            </Accordion.Item>
          )
        })}
      </Accordion>
    </SectionContent>
  )
}
