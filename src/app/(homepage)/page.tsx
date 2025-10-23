import { Announcement } from '@/components/Announcement'
import { BackgroundVideo } from '@/components/BackgroundVideo'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import { ExternalLink } from '@/components/ExternalLink'

import { homeLinks } from '@/constants/links'

export default function Home() {
  return (
    <>
      <BackgroundVideo />
      <Container>
        <div className="mx-auto flex flex-col items-center gap-15 text-center">
          <Announcement>Coming soon</Announcement>

          <div className="space-y-6">
            <h1 className="font-heading text-4xl font-medium text-pretty md:text-6xl">
              Filecoin Onchain Cloud
            </h1>
            <p className="mx-auto max-w-md font-sans text-xl text-pretty text-zinc-100">
              The future of the cloud starts with all of us.{' '}
              <br className="hidden sm:block" />
              Are you ready to take back the cloud?
            </p>
          </div>

          <ExternalLink
            href="https://ct2xy.share.hsforms.com/2WWxi-evaTTeHM0O-uXAu3Q"
            className="button"
          >
            Join the waitlist
          </ExternalLink>

          <div className="mt-6 grid w-full max-w-7xl grid-cols-1 gap-8 sm:px-8 md:grid-cols-2 xl:grid-cols-4">
            {homeLinks.map(({ text, icon, link }) => (
              <Card key={text} text={text} icon={icon} link={link} />
            ))}
          </div>
        </div>
      </Container>
    </>
  )
}
