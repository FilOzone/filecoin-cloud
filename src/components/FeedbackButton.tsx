import { ExternalLink } from '@/components/ExternalLink'

export function FeedbackButton() {
  return (
    <ExternalLink
      href="https://forms.fillout.com/t/2ZrChwnCqAus?utm_source=site"
      className="fixed bottom-4 right-4 z-50 rounded-full bg-zinc-100 px-4 py-2 font-semibold text-zinc-950 shadow-md border border-zinc-200 hover:-translate-y-0.5 transition-transform"
    >
      Give feedback
    </ExternalLink>
  )
}
