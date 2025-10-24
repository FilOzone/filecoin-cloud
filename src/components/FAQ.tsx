import { Accordion } from "./Accordion";
import { Container } from "./Container";

type FaqProps = {
  questions: Array<{ question: string; answer: string }>;
};

export function Faq({ questions }: FaqProps) {
  return (
    <div className="bg-zinc-950">
      <Container>
        {/* To be replaced with Header component once we migrate filecoin-site UI */}
        <h2 className="text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
          Frequently asked questions
        </h2>

        <Accordion
          type="single"
          collapsible
          className="mt-16 divide-y divide-white/20"
        >
          {questions.map(({ question, answer }) => {
            return (
              <Accordion.Item key={question} value={question} className="py-4">
                <Accordion.Trigger>{question}</Accordion.Trigger>
                <Accordion.Content>{answer}</Accordion.Content>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </Container>
    </div>
  );
}
