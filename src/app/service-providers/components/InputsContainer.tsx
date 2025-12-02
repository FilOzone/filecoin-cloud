type InputsContainerProps = {
  children: React.ReactNode
}

export function InputsContainer({ children }: InputsContainerProps) {
  return <div className="flex gap-4 flex-wrap @sm:flex-nowrap">{children}</div>
}
