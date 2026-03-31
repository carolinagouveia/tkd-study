import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useBeltContent } from '../hooks/useBelt'
import { MovementCard } from '../components/movement/MovementCard'
import { MovementDetail } from '../components/movement/MovementDetail'
import { Spinner } from '../components/ui/Spinner'
import { EmptyState } from '../components/ui/EmptyState'
import type { Movement } from '../data/schema'

export function MovementsPage() {
  const { beltId } = useParams<{ beltId: string }>()
  const { content, loading } = useBeltContent(beltId ?? null)
  const [selected, setSelected] = useState<Movement | null>(null)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Spinner />
      </div>
    )
  }

  if (!content || content.movements.length === 0) {
    return (
      <EmptyState
        icon="🥋"
        title="Sem movimentos"
        description="Ainda não há técnicas registadas para esta faixa."
      />
    )
  }

  return (
    <>
      <div className="flex flex-col gap-3 px-4 pt-4">
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-1">
          {content.movements.length} técnica{content.movements.length !== 1 ? 's' : ''}
        </p>
        {content.movements.map((m) => (
          <MovementCard key={m.id} movement={m} onClick={() => setSelected(m)} />
        ))}
      </div>

      <MovementDetail movement={selected} onClose={() => setSelected(null)} />
    </>
  )
}
