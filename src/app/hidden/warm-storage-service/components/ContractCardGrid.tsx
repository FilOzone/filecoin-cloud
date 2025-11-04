type ContractCardGridProps = {
  children: React.ReactNode
}

export function ContractCardGrid({ children }: ContractCardGridProps) {
  return (
    <ul className="sm:grid-cols-2 grid grid-cols-1 gap-4 lg:auto-cols-[1fr] lg:grid-flow-col lg:grid-rows-1">
      {children}
    </ul>
  )
}
