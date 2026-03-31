interface DeckProgressProps {
  current: number  // 1-based
  total: number
}

export function DeckProgress({ current, total }: DeckProgressProps) {
  const pct = total === 0 ? 0 : Math.round((current / total) * 100)

  return (
    <div className="w-full flex flex-col gap-1.5">
      <div className="flex justify-between text-xs font-semibold text-gray-400 dark:text-gray-500">
        <span>{current} de {total}</span>
        <span>{pct}%</span>
      </div>
      <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-accent-500 rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
