type BannerProps = {
  children: React.ReactNode
}

export function Banner({ children }: BannerProps) {
  return (
    <header className="w-full bg-[#0C0C18] py-2.5 text-center font-sans text-sm sm:py-3.5 sm:text-base">
      <div className="flex justify-center px-4">
        <p className="font-medium text-white">{children}</p>
      </div>
    </header>
  )
}
