import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useBeltContent } from '../hooks/useBelt'
import { PoomseWalkthrough } from '../components/poomse/PoomseWalkthrough'
import { Spinner } from '../components/ui/Spinner'
import { EmptyState } from '../components/ui/EmptyState'
import type { Poomse } from '../data/schema'

export function PoomsePage() {
  const { beltId } = useParams<{ beltId: string }>()
  const { content, loading } = useBeltContent(beltId ?? null)
  const [activePoomse, setActivePoomse] = useState<Poomse | null>(null)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Spinner />
      </div>
    )
  }

  if (!content || content.poomse.length === 0) {
    return (
      <EmptyState
        icon="🌀"
        title="Sem poomse ainda"
        description="As formas são introduzidas a partir da Faixa Amarela. Continua a treinar!"
      />
    )
  }

  return (
    <div className="px-4 pt-4 pb-6">
      <AnimatePresence mode="wait">
        {activePoomse ? (
          <motion.div
            key="walkthrough"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={() => setActivePoomse(null)}
              className="flex items-center gap-1.5 text-sm font-semibold text-accent-500 mb-4 tap-target"
            >
              ← Todas as poomse
            </button>
            <PoomseWalkthrough poomse={activePoomse} />
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-3"
          >
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-1">
              {content.poomse.length} forma{content.poomse.length !== 1 ? 's' : ''}
            </p>
            {content.poomse.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePoomse(p)}
                className="w-full bg-white dark:bg-gray-900 rounded-2xl shadow-card dark:shadow-card-dark p-5 text-left transition-transform active:scale-[0.98] hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-extrabold text-gray-900 dark:text-gray-100 text-base">{p.name}</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">{p.nameKorean} · {p.totalSteps} movimentos</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed line-clamp-2">{p.description}</p>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent-50 dark:bg-accent-900/30 flex items-center justify-center text-xl">
                    🌀
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-accent-500 text-sm font-semibold">
                  Iniciar walkthrough
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
