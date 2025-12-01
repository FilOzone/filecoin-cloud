type InputContainerProps = {
  children: React.ReactNode
}

export function InputContainer({ children }: InputContainerProps) {
  return <div className="flex gap-4 flex-wrap @sm:flex-nowrap">{children}</div>
}
