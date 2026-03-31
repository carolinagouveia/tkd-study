import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useBeltContent } from '../hooks/useBelt'
import { useChecklistStore, useSRStore } from '../store/srStore'
import { Spinner } from '../components/ui/Spinner'
import { Card } from '../components/ui/Card'

interface ModuleItem {
  label: string
  description: string
  badge?: number    // red badge count
  icon: string
  to: string
  available: boolean
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

export function DashboardPage() {
  const { beltId } = useParams<{ beltId: string }>()
  const navigate = useNavigate()
  const { content, loading } = useBeltContent(beltId ?? null)
  const { completedCount } = useChecklistStore()
  const { getDueCards } = useSRStore()

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Spinner />
      </div>
    )
  }

  if (!content) return null

  const { belt } = content
  const checklistIds  = content.checklist.map((i) => i.id)
  const doneCount     = completedCount(beltId ?? '', checklistIds)
  const examProgress  = checklistIds.length === 0 ? 0 : Math.round((doneCount / checklistIds.length) * 100)
  const vocabIds      = content.vocabulary.map((v) => v.id)
  const dueVocabCount = getDueCards(vocabIds).length

  const modules: ModuleItem[] = [
    {
      label: 'Vocabulário',
      description: dueVocabCount > 0
        ? `${dueVocabCount} para rever hoje`
        : `${content.vocabulary.length} termos`,
      badge: dueVocabCount > 0 ? dueVocabCount : undefined,
      icon: '🗂️',
      to: `/belt/${beltId}/vocabulario`,
      available: content.vocabulary.length > 0,
    },
    {
      label: 'Movimentos',
      description: `${content.movements.length} técnicas`,
      icon: '🥋',
      to: `/belt/${beltId}/movimentos`,
      available: content.movements.length > 0,
    },
    {
      label: 'Poomse',
      description: content.poomse.length > 0 ? `${content.poomse.length} forma(s)` : 'Em breve',
      icon: '🌀',
      to: `/belt/${beltId}/poomse`,
      available: content.poomse.length > 0,
    },
    {
      label: 'Contagem',
      description: 'Números em coreano',
      icon: '🔢',
      to: `/belt/${beltId}/contar`,
      available: true,
    },
    {
      label: 'Exame',
      description: doneCount > 0 ? `${doneCount}/${checklistIds.length} itens concluídos` : `${checklistIds.length} itens para verificar`,
      icon: examProgress === 100 ? '🏆' : '✅',
      to: `/belt/${beltId}/checklist`,
      available: content.checklist.length > 0,
    },
    {
      label: 'Instrutor',
      description: 'Cartões personalizados',
      icon: '✏️',
      to: `/belt/${beltId}/instrutor`,
      available: true,
    },
  ]

  return (
    <div className="px-4 pt-4 pb-6">
      {/* Belt intro */}
      <div
        className="rounded-3xl p-5 mb-5 text-center"
        style={{ backgroundColor: belt.color }}
      >
        <p className="text-3xl font-black" style={{ color: belt.textColor }}>
          {belt.nameKorean}
        </p>
        <p className="text-sm font-semibold mt-1 opacity-70" style={{ color: belt.textColor }}>
          {belt.namePt}
        </p>
        {belt.meaning && (
          <p className="text-sm mt-1.5 font-medium opacity-85 italic max-w-xs mx-auto" style={{ color: belt.textColor }}>
            {belt.meaning}
          </p>
        )}
        <p className="text-xs mt-2 opacity-60 max-w-xs mx-auto" style={{ color: belt.textColor }}>
          {belt.examRequirements}
        </p>
      </div>

      <h2 className="text-base font-bold text-gray-700 dark:text-gray-300 mb-3 px-1">
        Módulos de estudo
      </h2>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-3"
      >
        {modules.map((mod) => (
          <motion.div key={mod.label} variants={item}>
            <Card
              padding="md"
              onClick={mod.available ? () => navigate(mod.to) : undefined}
              className={[
                'h-full transition-transform duration-150',
                mod.available
                  ? 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]'
                  : 'opacity-50 cursor-not-allowed',
              ].join(' ')}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-2xl">{mod.icon}</span>
                {mod.badge !== undefined && mod.badge > 0 && (
                  <span className="bg-accent-500 text-white text-[10px] font-extrabold rounded-full w-5 h-5 flex items-center justify-center leading-none">
                    {mod.badge > 99 ? '99+' : mod.badge}
                  </span>
                )}
              </div>
              <p className="font-bold text-gray-900 dark:text-gray-100 text-sm leading-snug">
                {mod.label}
              </p>
              <p className={`text-xs mt-0.5 ${mod.badge ? 'text-accent-500 font-semibold' : 'text-gray-400 dark:text-gray-500'}`}>
                {mod.description}
              </p>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
