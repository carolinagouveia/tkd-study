interface PoomseProgressProps {
  current: number   // 1-based display
  total: number
  onSelect?: (index: number) => void  // 0-based
}

export function PoomseProgress({ current, total, onSelect }: PoomseProgressProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs font-semibold text-gray-400 dark:text-gray-500">
        <span>Passo {current} de {total}</span>
        <span>{Math.round((current / total) * 100)}%</span>
      </div>

      {/* Step dots — tap to jump */}
      <div className="flex gap-1 flex-wrap">
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            onClick={() => onSelect?.(i)}
            aria-label={`Ir para passo ${i + 1}`}
            className={[
              'h-1.5 rounded-full transition-all duration-200',
              i < current
                ? 'bg-accent-500'
                : i === current - 1
                  ? 'bg-accent-500 w-4'
                  : 'bg-gray-200 dark:bg-gray-700',
              i < current || i === current - 1 ? '' : 'opacity-60',
            ].join(' ')}
            style={{ width: i === current - 1 ? undefined : '10px' }}
          />
        ))}
      </div>
    </div>
  )
}
