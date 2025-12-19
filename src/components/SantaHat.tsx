import Image from 'next/image'

export type SantaHatProps = {
  show: boolean
}

export function SantaHat({ show }: SantaHatProps) {
  if (!show) return null

  return (
    <Image
      src="/santa-hat.png"
      alt=""
      width={60}
      height={39}
      className="absolute -top-6 right-14 animate-hat-drop"
      aria-hidden="true"
    />
  )
}
