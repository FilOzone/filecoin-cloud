type ContractCardGridProps = {
  children: React.ReactNode
}

export function ContractCardGrid({ children }: ContractCardGridProps) {
  return (
    <div className="grid lg:grid-rows-1 lg:grid-flow-col lg:auto-cols-[1fr] gap-4 grid-cols-1 sm:grid-cols-2">
      {children}
    </div>
  )
}
