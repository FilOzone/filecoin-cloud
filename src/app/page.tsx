import { Announcement } from '@/components/Announcement'
import { Card } from '@/components/Card'

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
        <Announcement>Coming Soon</Announcement>
        <Card
          title="Filecoin Onchain Cloud"
          description="Launching Soon"
          link="https://www.google.com"
        />

        <h1 className="font-heading text-6xl">Filecoin Onchain Cloud</h1>
        <p className="font-sans">
          Filecoin Onchain Cloud provides transparent storage, retrieval, and
          payments on the Filecoin network — launching soon.
        </p>
      </main>
    </div>
  )
}
