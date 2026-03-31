import { useEffect, useCallback } from 'react'
import type { Poomse } from '../../data/schema'
import { usePoomse } from '../../hooks/usePoomse'
import { PoomseStepCard } from './PoomseStepCard'
import { PoomseProgress } from './PoomseProgress'
import { PoomseDirectionMap } from './PoomseDirectionMap'

interface PoomseWalkthroughProps {
  poomse: Poomse
}

export function PoomseWalkthrough({ poomse }: PoomseWalkthroughProps) {
  const { currentStep, stepIndex, totalSteps, isFirst, isLast, next, prev, goTo, restart } = usePoomse(poomse)

  // Keyboard navigation
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next()
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   prev()
  }, [next, prev])

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  return (
    <div className="flex flex-col gap-4">
      {/* Poomse title */}
      <div className="px-1">
        <h2 className="text-xl font-extrabold text-gray-900 dark:text-gray-50">{poomse.name}</h2>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5 leading-snug">{poomse.description}</p>
      </div>

      {/* Floor diagram */}
      <PoomseDirectionMap steps={poomse.steps} currentIndex={stepIndex} />

      {/* Progress */}
      <PoomseProgress current={stepIndex + 1} total={totalSteps} onSelect={goTo} />

      {/* Step card */}
      <PoomseStepCard step={currentStep} stepIndex={stepIndex} />

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={prev}
          disabled={isFirst}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed tap-target transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          ← Anterior
        </button>

        {isLast ? (
          <button
            onClick={restart}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-accent-500 text-white font-semibold text-sm tap-target transition-colors hover:bg-accent-600"
          >
            🔄 Recomeçar
          </button>
        ) : (
          <button
            onClick={next}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-accent-500 text-white font-semibold text-sm tap-target transition-colors hover:bg-accent-600"
          >
            Seguinte →
          </button>
        )}
      </div>

      <p className="text-center text-xs text-gray-300 dark:text-gray-700">
        Podes também navegar com as teclas ← →
      </p>
    </div>
  )
}
