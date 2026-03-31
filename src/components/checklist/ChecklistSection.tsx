import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ChecklistItem, ChecklistCategory } from '../../data/schema'
import { ChecklistItemRow } from './ChecklistItemRow'

const categoryLabels: Record<ChecklistCategory, string> = {
  vocabulario:       '📖 Vocabulário',
  'tecnicas-de-mao': '✊ Técnicas de Mão',
  'tecnicas-de-pe':  '🦵 Técnicas de Pé',
  poomse:            '🌀 Poomse',
  quebra:            '🪵 Quebra de Tábua',
  teoria:            '🧠 Teoria',
}

interface ChecklistSectionProps {
  category: ChecklistCategory
  items: ChecklistItem[]
  isCompleted: (id: string) => boolean
  onToggle: (id: string) => void
}

export function ChecklistSection({ category, items, isCompleted, onToggle }: ChecklistSectionProps) {
  const [open, setOpen] = useState(true)
  const completedCount = items.filter((i) => isCompleted(i.id)).length
  const allDone = completedCount === items.length

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-card dark:shadow-card-dark overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 tap-target"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
            {categoryLabels[category]}
          </span>
          {allDone && <span className="text-xs text-green-500 font-semibold">✓ Completo</span>}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">
            {completedCount}/{items.length}
          </span>
          <motion.svg
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400"
          >
            <polyline points="6 9 12 15 18 9"/>
          </motion.svg>
        </div>
      </button>

      {/* Progress bar */}
      <div className="h-1 bg-gray-100 dark:bg-gray-800 mx-4 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-accent-500 rounded-full"
          animate={{ width: `${(completedCount / items.length) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Items */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-2 divide-y divide-gray-50 dark:divide-gray-800">
              {items.map((item) => (
                <ChecklistItemRow
                  key={item.id}
                  item={item}
                  completed={isCompleted(item.id)}
                  onToggle={() => onToggle(item.id)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
