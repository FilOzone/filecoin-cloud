'use client'

import { useState } from 'react'
import Image from 'next/image'

import BackgroundVideoPoster from '@/public/background-video-poster.webp'

export default function BackgroundVideo() {
  const [videoError, setVideoError] = useState(false)

  return (
    <div className="absolute inset-0 isolate -z-10">
      <div className="absolute inset-0 bg-black/40" />
      {videoError ? (
        <Image
          src={BackgroundVideoPoster}
          alt=""
          className="h-full w-full object-cover"
        />
      ) : (
        <video
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          poster="/background-video-poster.webp"
          onError={() => setVideoError(true)}
        >
          <source src="/background-video.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  )
}
