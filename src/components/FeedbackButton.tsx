'use client'

import { ExternalLink } from '@/components/ExternalLink'

import { useDistanceFromTop } from '@/hooks/use-distance-from-top'

const BUFFER_DISTANCE = 50

export function FeedbackButton() {
  const distance = useDistanceFromTop()

  const opacity =
    distance > BUFFER_DISTANCE
      ? Math.min((distance - BUFFER_DISTANCE) / (BUFFER_DISTANCE * 10), 1)
      : 0

  const isVisible = opacity >= 0.33

  return (
    <ExternalLink
      href="https://forms.fillout.com/t/2ZrChwnCqAus?utm_source=site"
      className="fixed bottom-4 right-4 z-50 rounded-full bg-zinc-100 px-4 py-2 font-semibold text-zinc-950 shadow-md border border-zinc-200 hover:-translate-y-0.5 transition focus:brand-outline focus-visible:brand-outline"
      tabIndex={isVisible ? 0 : -1}
      aria-hidden={!isVisible}
      style={{
        opacity,
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      Give feedback
    </ExternalLink>
  )
}
