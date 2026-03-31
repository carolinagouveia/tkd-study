import { useParams, useNavigate } from 'react-router-dom'
import { useBeltContent } from '../hooks/useBelt'
import { useChecklistStore } from '../store/srStore'
import { useBeltStore } from '../store/beltStore'
import { ChecklistSection } from '../components/checklist/ChecklistSection'
import { ChecklistCompletionBanner } from '../components/checklist/ChecklistCompletionBanner'
import { Spinner } from '../components/ui/Spinner'
import { EmptyState } from '../components/ui/EmptyState'
import type { ChecklistCategory } from '../data/schema'
import beltsData from '../data/belts.json'
import type { Belt } from '../data/schema'

const belts = beltsData as Belt[]

export function ChecklistPage() {
  const { beltId } = useParams<{ beltId: string }>()
  const navigate = useNavigate()
  const { content, loading } = useBeltContent(beltId ?? null)
  const { toggleItem, isCompleted } = useChecklistStore()
  const { unlockedBeltIds, unlockBelt, setActiveBelt } = useBeltStore()

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Spinner />
      </div>
    )
  }

  if (!content || content.checklist.length === 0) {
    return <EmptyState icon="✅" title="Sem itens de exame" description="Ainda não há requisitos registados para esta faixa." />
  }

  const { belt, checklist } = content

  // Group checklist items by category
  const grouped = checklist.reduce<Partial<Record<ChecklistCategory, typeof checklist>>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category]!.push(item)
    return acc
  }, {})

  const allCompleted = checklist.every((item) => isCompleted(item.id))
  const completedCount = checklist.filter((item) => isCompleted(item.id)).length

  // Find next belt
  const currentBelt = belts.find((b) => b.id === beltId)
  const nextBelt = currentBelt ? belts.find((b) => b.order === currentBelt.order + 1) : null
  const nextAlreadyUnlocked = nextBelt ? unlockedBeltIds.includes(nextBelt.id) : false

  function handleUnlock() {
    if (!nextBelt) return
    unlockBelt(nextBelt.id)
    setActiveBelt(nextBelt.id)
    navigate(`/belt/${nextBelt.id}`)
  }

  return (
    <div className="flex flex-col gap-3 pt-4 pb-4">
      {/* Header summary */}
      <div className="px-4 mb-1">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            Requisitos do exame
          </p>
          <p className="text-xs font-bold text-accent-500">
            {completedCount}/{checklist.length}
          </p>
        </div>
        {/* Overall progress bar */}
        <div className="mt-2 w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent-500 rounded-full transition-all duration-500"
            style={{ width: `${(completedCount / checklist.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Completion banner */}
      {allCompleted && !nextAlreadyUnlocked && (
        <ChecklistCompletionBanner
          beltName={belt.namePt}
          nextBeltName={nextBelt?.namePt ?? null}
          onUnlock={handleUnlock}
        />
      )}

      {/* Checklist sections */}
      <div className="flex flex-col gap-3 px-4">
        {(Object.entries(grouped) as [ChecklistCategory, typeof checklist][]).map(([cat, items]) => (
          <ChecklistSection
            key={cat}
            category={cat}
            items={items}
            isCompleted={isCompleted}
            onToggle={toggleItem}
          />
        ))}
      </div>
    </div>
  )
}
