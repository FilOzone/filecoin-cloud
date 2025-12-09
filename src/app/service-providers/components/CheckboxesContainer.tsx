type CheckboxesContainerProps = {
  children: React.ReactNode
}

export function CheckboxesContainer({ children }: CheckboxesContainerProps) {
  return <div className="flex flex-col gap-3">{children}</div>
}
