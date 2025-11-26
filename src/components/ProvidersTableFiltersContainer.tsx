type ProvidersTableFiltersContainerProps = {
  children: React.ReactNode
}

export function ProvidersTableFiltersContainer({
  children,
}: ProvidersTableFiltersContainerProps) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-6 pb-6">
      {children}
    </div>
  )
}
