type ErrorMessageProps = {
  message: string
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <p className="text-(--color-brand-error) text-sm pt-2" role="alert">
      {message}
    </p>
  )
}
