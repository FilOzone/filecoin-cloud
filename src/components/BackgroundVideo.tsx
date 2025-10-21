'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import BackgroundVideoPoster from '@/public/background-video-poster.webp'

export function BackgroundVideo() {
  const [videoError, setVideoError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6
    }
  }, [])

  return (
    <div className="absolute inset-0 -left-1 isolate -z-10">
      <div className="absolute inset-0 bg-black/55" />
      {videoError ? (
        <Image
          src={BackgroundVideoPoster}
          alt=""
          className="h-full w-full object-cover"
        />
      ) : (
        <video
          ref={videoRef}
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
