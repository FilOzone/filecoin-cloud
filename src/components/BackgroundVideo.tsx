export default function BackgroundVideo() {
  return (
    <div className="absolute inset-0 isolate -z-10">
      <div className="absolute inset-0 bg-black/25" />
      <video
        aria-hidden="true"
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        poster="../../public/images/fallback.webp"
      >
        <source src="/videos/background.mp4" type="video/mp4" />
      </video>
    </div>
  )
}
