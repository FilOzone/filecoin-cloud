type ErrorMessageProps = {
  message: string
  id?: string
}

export function ErrorMessage({ message, id }: ErrorMessageProps) {
  return (
    <p id={id} className="text-(--color-brand-error) text-sm pt-2" role="alert">
      {message}
    </p>
  )
}
