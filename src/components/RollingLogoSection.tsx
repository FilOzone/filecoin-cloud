'use client'

import type { LogoItemProps } from '@filecoin-foundation/ui-filecoin/LogoSection/LogoItem'
import type { StaticImageData } from 'next/image'
import Image from 'next/image'

import './RollingLogoSection.css'

interface RollingLogoSectionProps {
  title: string
  logos: Array<LogoItemProps>
}

export function RollingLogoSection({ title, logos }: RollingLogoSectionProps) {
  const duplicatedLogos = [...logos, ...logos]

  return (
    <section className="relative overflow-hidden py-16 w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-semibold text-white mb-12">
          {title}
        </h2>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-10" />

        <div className="rolling-logos-container">
          <div className="rolling-logos-track">
            {duplicatedLogos.map((logo, index) => {
              const uniqueKey = `${logo.alt}-${index}`
              return logo.href ? (
                <a
                  key={uniqueKey}
                  href={logo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rolling-logo-item"
                >
                  <Image
                    src={logo.logo as StaticImageData}
                    alt={logo.alt}
                    className="h-12 w-auto object-contain"
                    height={logo.size || 48}
                  />
                </a>
              ) : (
                <div key={uniqueKey} className="rolling-logo-item">
                  <Image
                    src={logo.logo as StaticImageData}
                    alt={logo.alt}
                    className="h-12 w-auto object-contain"
                    height={logo.size || 48}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}