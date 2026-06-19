export function FieldErrorAlert({ errorMessage }) {
  return (
    <p className="text-destructive text-sm">
      {errorMessage}
    </p>
  )
}
