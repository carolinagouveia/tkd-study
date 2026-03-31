import { motion } from 'framer-motion'
import type { SessionStats } from '../../hooks/useFlashcards'
import { Button } from '../ui/Button'

interface SessionSummaryProps {
  stats: SessionStats
  onRestart: () => void
  onBack: () => void
}

function StatPill({ emoji, label, value, color }: { emoji: string; label: string; value: number; color: string }) {
  return (
    <div className={`flex-1 flex flex-col items-center gap-1 py-4 rounded-2xl ${color}`}>
      <span className="text-2xl">{emoji}</span>
      <span className="text-xl font-extrabold">{value}</span>
      <span className="text-xs font-semibold opacity-75">{label}</span>
    </div>
  )
}

export function SessionSummary({ stats, onRestart, onBack }: SessionSummaryProps) {
  const retention = stats.total === 0 ? 0 : Math.round(((stats.good + stats.easy) / stats.total) * 100)

  const message =
    retention === 100 ? '🏆 Perfeito! Dominas estes termos!'
    : retention >= 80  ? '🌟 Óptimo trabalho! Continua assim!'
    : retention >= 50  ? '💪 Bom esforço! A praticar cresce!'
    : '🔥 Não desistas! A repetição é a chave!'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center gap-6 py-8 px-4"
    >
      <div className="text-center">
        <p className="text-4xl font-extrabold text-gray-900 dark:text-gray-50">{retention}%</p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Taxa de acerto</p>
        <p className="text-base font-semibold text-gray-700 dark:text-gray-300 mt-3">{message}</p>
      </div>

      <div className="flex gap-3 w-full">
        <StatPill emoji="🔁" label="De Novo" value={stats.again}
          color="bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400" />
        <StatPill emoji="👍" label="Bom"     value={stats.good}
          color="bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400" />
        <StatPill emoji="⭐" label="Fácil"   value={stats.easy}
          color="bg-green-50 text-green-600 dark:bg-green-950/40 dark:text-green-400" />
      </div>

      <div className="flex flex-col gap-3 w-full">
        <Button variant="primary" size="lg" fullWidth onClick={onRestart}>
          Praticar de novo 🔄
        </Button>
        <Button variant="secondary" size="md" fullWidth onClick={onBack}>
          Voltar ao painel
        </Button>
      </div>
    </motion.div>
  )
}
