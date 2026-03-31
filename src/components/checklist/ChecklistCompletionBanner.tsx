import { motion } from 'framer-motion'
import { Button } from '../ui/Button'

interface ChecklistCompletionBannerProps {
  beltName: string
  nextBeltName: string | null
  onUnlock: () => void
}

export function ChecklistCompletionBanner({ beltName, nextBeltName, onUnlock }: ChecklistCompletionBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, type: 'spring' }}
      className="mx-4 mb-4 bg-gradient-to-br from-accent-500 to-accent-700 rounded-3xl p-5 text-white text-center flex flex-col gap-3 shadow-lg"
    >
      <p className="text-3xl">🏆</p>
      <div>
        <p className="font-extrabold text-lg leading-snug">
          {beltName} completa!
        </p>
        <p className="text-sm text-accent-100 mt-1">
          Completaste todos os requisitos do exame.
        </p>
      </div>
      {nextBeltName ? (
        <Button
          variant="secondary"
          size="md"
          onClick={onUnlock}
          className="bg-white/20 text-white border-white/30 hover:bg-white/30 dark:bg-white/20 dark:text-white dark:hover:bg-white/30"
        >
          Desbloquear {nextBeltName} 🥋
        </Button>
      ) : (
        <p className="text-sm text-accent-200 font-semibold">
          Parabéns, mestre! 🥷
        </p>
      )}
    </motion.div>
  )
}
