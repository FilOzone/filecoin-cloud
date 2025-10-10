import { Container } from '@/components/Container'
import { Announcement } from '@/components/Announcement'
import { homeLinks, waitlistFormLink } from '@/constants/links'
import { Card } from '@/components/Card'
import { ExternalLink } from '@/components/ExternalLink'

export default function Home() {
  return (
    <Container>
      <div className="mx-auto flex flex-col items-center gap-15 text-center">
        <Announcement>Coming soon</Announcement>

        <div className="space-y-6">
          <h1 className="font-heading text-4xl font-medium text-pretty md:text-6xl">
            Filecoin Onchain Cloud
          </h1>
          <p className="mx-auto max-w-md text-center text-xl text-pretty text-zinc-300">
            The future of the cloud starts with all of us. Are you ready to take
            back the cloud?
          </p>
        </div>

        <ExternalLink href={waitlistFormLink} className="button">
          Join the waitlist
        </ExternalLink>

        <div className="mt-4 grid w-full max-w-6xl grid-cols-1 gap-8 px-0 sm:px-20 md:grid-cols-2 lg:px-40 xl:grid-cols-4 xl:px-0">
          {homeLinks.map(({ label, cta, link }) => (
            <Card key={label} title={label} description={cta} link={link} />
          ))}
        </div>
      </div>
    </Container>
  )
}
