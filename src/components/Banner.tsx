type BannerProps = {
  children: React.ReactNode
  label?: string
}

export function Banner({ children, label }: BannerProps) {
  return (
    <section
      className="w-full bg-[#0C0C18] py-2.5 text-center font-sans text-sm sm:py-3.5 sm:text-base"
      role="banner"
      aria-label={`Banner: ${label}`}
    >
      <div className="flex justify-center px-4">
        <p className="font-medium text-white">{children}</p>
      </div>
    </section>
  )
}
