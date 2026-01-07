'use client'

import { useBackground } from '@filecoin-foundation/ui-filecoin/Section/Section'
import { SectionContent } from '@filecoin-foundation/ui-filecoin/SectionContent'
import { clsx } from 'clsx'

import { Accordion } from './Accordion'

export type Question = {
  question: string
  answer: React.ReactNode
}

type FaqProps = {
  questions: Array<Question>
}

export function Faq({ questions }: FaqProps) {
  const { isDark } = useBackground()

  return (
    <div className="max-w-4xl">
      <SectionContent headingTag="h2" title="Frequently asked questions">
        <Accordion type="single" collapsible className="divide-white/20">
          {questions.map(({ question, answer }) => {
            return (
              <Accordion.Item key={question} value={question} className="py-4">
                <Accordion.Trigger>{question}</Accordion.Trigger>
                <Accordion.Content
                  className={clsx('prose max-w-none', isDark && 'prose-invert')}
                >
                  {answer}
                </Accordion.Content>
              </Accordion.Item>
            )
          })}
        </Accordion>
      </SectionContent>
    </div>
  )
}
