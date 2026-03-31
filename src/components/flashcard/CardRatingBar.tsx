import { motion } from 'framer-motion'
import type { Rating } from '../../hooks/useFlashcards'

interface CardRatingBarProps {
  visible: boolean
  onRate: (r: Rating) => void
}

const buttons: { rating: Rating; label: string; emoji: string; cls: string }[] = [
  {
    rating: 'again',
    label: 'De Novo',
    emoji: '🔁',
    cls: 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900',
  },
  {
    rating: 'good',
    label: 'Bom',
    emoji: '👍',
    cls: 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900',
  },
  {
    rating: 'easy',
    label: 'Fácil',
    emoji: '⭐',
    cls: 'bg-green-50 text-green-600 border-green-200 hover:bg-green-100 dark:bg-green-950/40 dark:text-green-400 dark:border-green-900',
  },
]

export function CardRatingBar({ visible, onRate }: CardRatingBarProps) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12, pointerEvents: visible ? 'auto' : 'none' }}
      transition={{ duration: 0.2 }}
      className="w-full flex gap-3"
    >
      {buttons.map(({ rating, label, emoji, cls }) => (
        <button
          key={rating}
          onClick={() => onRate(rating)}
          className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-2xl border font-semibold text-sm transition-colors tap-target ${cls}`}
        >
          <span className="text-lg">{emoji}</span>
          <span>{label}</span>
        </button>
      ))}
    </motion.div>
  )
}
