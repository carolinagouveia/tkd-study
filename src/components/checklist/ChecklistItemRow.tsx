import { motion } from 'framer-motion'
import type { ChecklistItem } from '../../data/schema'

interface ChecklistItemRowProps {
  item: ChecklistItem
  completed: boolean
  onToggle: () => void
}

export function ChecklistItemRow({ item, completed, onToggle }: ChecklistItemRowProps) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-start gap-3 py-3 text-left group tap-target"
      aria-pressed={completed}
    >
      {/* Checkbox */}
      <div
        className={[
          'w-6 h-6 rounded-lg border-2 flex-shrink-0 flex items-center justify-center transition-colors duration-200 mt-0.5',
          completed
            ? 'bg-accent-500 border-accent-500'
            : 'border-gray-300 dark:border-gray-700 group-hover:border-accent-400',
        ].join(' ')}
      >
        {completed && (
          <motion.svg
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"/>
          </motion.svg>
        )}
      </div>

      {/* Label */}
      <div className="flex-1">
        <p
          className={[
            'text-sm font-medium leading-snug transition-colors',
            completed
              ? 'text-gray-400 dark:text-gray-600 line-through'
              : 'text-gray-800 dark:text-gray-200',
          ].join(' ')}
        >
          {item.labelPt}
        </p>
        {item.description && (
          <p className="text-xs text-gray-400 dark:text-gray-600 mt-0.5">{item.description}</p>
        )}
      </div>
    </button>
  )
}
