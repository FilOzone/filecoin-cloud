type CheckboxContainerProps = {
  children: React.ReactNode
}

export function CheckboxesContainer({ children }: CheckboxContainerProps) {
  return <div className="flex flex-col gap-3">{children}</div>
}
