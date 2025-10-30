'use client'

import Image, { type StaticImageData } from 'next/image'
import { useEffect, useRef, useState } from 'react'

type BackgroundVideoProps = {
  videoPath: `/${string}.mp4`
  poster: StaticImageData
  playbackRate?: number
}

export function BackgroundVideo({
  videoPath,
  poster,
  playbackRate = 1,
}: BackgroundVideoProps) {
  const [videoError, setVideoError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate
    }
  }, [playbackRate])

  return (
    <div className="absolute inset-0 -left-1 isolate -z-10">
      <div className="absolute inset-0 bg-black/50" />
      {videoError ? (
        <Image src={poster} alt="" className="h-full w-full object-cover" />
      ) : (
        <>
          <video
            ref={videoRef}
            className="h-full w-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            poster={poster.src}
            onError={() => setVideoError(true)}
          >
            <source src={videoPath} type="video/mp4" />
          </video>
          <div className="absolute inset-x-0 bottom-0 h-64 bg-linear-to-b from-transparent to-zinc-950" />
        </>
      )}
    </div>
  )
}
