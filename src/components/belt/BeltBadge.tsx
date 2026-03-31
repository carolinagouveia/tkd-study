import type { Belt } from '../../data/schema'

interface BeltBadgeProps {
  belt: Belt
  size?: 'sm' | 'md'
}

export function BeltBadge({ belt, size = 'sm' }: BeltBadgeProps) {
  const dot = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'
  const text = size === 'sm' ? 'text-xs' : 'text-sm'

  return (
    <span className={`inline-flex items-center gap-1.5 font-semibold ${text} text-gray-600 dark:text-gray-400`}>
      <span
        className={`${dot} rounded-full border border-gray-300 dark:border-gray-600 flex-shrink-0`}
        style={{ backgroundColor: belt.color }}
        aria-hidden="true"
      />
      {belt.namePt}
    </span>
  )
}
