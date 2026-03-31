export function Spinner({ className = '' }: { className?: string }) {
  return (
    <div
      role="status"
      aria-label="A carregar..."
      className={`inline-block w-6 h-6 rounded-full border-2 border-gray-200 dark:border-gray-700 border-t-accent-500 animate-spin ${className}`}
    />
  )
}
