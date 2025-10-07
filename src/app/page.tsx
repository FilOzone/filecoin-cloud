import { Container } from '@/components/Container'
import { Announcement } from '@/components/Announcement'
import { Button } from '@/components/Button'
import { homeLinks } from '@/constants/links'
import { Card } from '@/components/Card'

export default function Home() {
  return (
    <Container>
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <Announcement>Coming soon</Announcement>

        <h1 className="font-heading pt-15 text-4xl font-medium text-pretty md:text-6xl">
          Filecoin Onchain Cloud
        </h1>
        <p className="pt-6 text-xl text-pretty text-zinc-300">
          Filecoin Onchain Cloud provides transparent storage, retrieval, and
          payments on the Filecoin network — launching soon.
        </p>

        <Button className="mt-15">Join the waitlist</Button>

        <div className="mt-15 grid w-full grid-cols-1 gap-10 px-0 sm:px-15 md:grid-cols-2 md:px-0">
          {homeLinks.map(({ label, cta, link }) => (
            <Card key={label} title={label} description={cta} link={link} />
          ))}
        </div>
      </div>
    </Container>
  )
}
