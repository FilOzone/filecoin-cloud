type InfoCardGridProps = {
  children: React.ReactNode
}

export function InfoCardGrid({ children }: InfoCardGridProps) {
  return (
    <ul className="sm:grid-cols-2 grid grid-cols-1 gap-4 lg:grid-cols-4">
      {children}
    </ul>
  )
}
