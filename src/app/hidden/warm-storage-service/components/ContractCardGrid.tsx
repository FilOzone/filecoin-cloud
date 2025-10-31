type ContractCardGridProps = {
  children: React.ReactNode
}

export function ContractCardGrid({ children }: ContractCardGridProps) {
  return (
    <div className="grid lg:grid-rows-1 lg:grid-cols-4 gap-4 grid-cols-1 sm:grid-cols-2">
      {children}
    </div>
  )
}
