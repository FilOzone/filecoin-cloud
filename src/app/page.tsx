import { Container } from '@/components/Container'
import { Announcement } from '@/components/Announcement'
import { Button } from '@/components/Button'

export default function Home() {
  return (
    <Container>
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <Announcement>Coming soon</Announcement>

        <h1 className="font-heading pt-15 text-6xl font-medium">
          Filecoin Onchain Cloud
        </h1>
        <p className="pt-6 text-xl text-pretty text-zinc-300">
          Filecoin Onchain Cloud provides transparent storage, retrieval, and
          payments on the Filecoin network — launching soon.
        </p>

        <Button className="mt-15">Join the waitlist</Button>
      </div>
    </Container>
  )
}
