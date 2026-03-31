import { useState, useCallback } from 'react'
import type { Poomse, PoomseStep } from '../data/schema'

export interface UsePoomseReturn {
  poomse: Poomse
  currentStep: PoomseStep
  stepIndex: number        // 0-based
  totalSteps: number
  isFirst: boolean
  isLast: boolean
  next: () => void
  prev: () => void
  goTo: (index: number) => void
  restart: () => void
}

export function usePoomse(poomse: Poomse): UsePoomseReturn {
  const [stepIndex, setStepIndex] = useState(0)

  const next    = useCallback(() => setStepIndex((i) => Math.min(i + 1, poomse.steps.length - 1)), [poomse.steps.length])
  const prev    = useCallback(() => setStepIndex((i) => Math.max(i - 1, 0)), [])
  const goTo    = useCallback((i: number) => setStepIndex(Math.max(0, Math.min(i, poomse.steps.length - 1))), [poomse.steps.length])
  const restart = useCallback(() => setStepIndex(0), [])

  return {
    poomse,
    currentStep: poomse.steps[stepIndex],
    stepIndex,
    totalSteps: poomse.steps.length,
    isFirst: stepIndex === 0,
    isLast: stepIndex === poomse.steps.length - 1,
    next,
    prev,
    goTo,
    restart,
  }
}
