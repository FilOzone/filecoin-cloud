type CheckboxContainerProps = {
  children: React.ReactNode
}

export function CheckboxContainer({ children }: CheckboxContainerProps) {
  return <div className="flex flex-col gap-3">{children}</div>
}
