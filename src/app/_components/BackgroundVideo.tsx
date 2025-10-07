'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function BackgroundVideo() {
  const [videoError, setVideoError] = useState(false)

  return (
    <div className="absolute inset-0 -z-10">
      {!videoError ? (
        <video
          aria-hidden="true"
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          onError={() => setVideoError(true)}
        >
          <source src="/videos/background.mp4" type="video/mp4" />
        </video>
      ) : (
        <Image
          aria-hidden="true"
          fill
          src="/images/fallback.webp"
          alt=""
          className="h-full w-full object-cover"
          priority
        />
      )}
    </div>
  )
}
