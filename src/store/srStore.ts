import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CardRecord {
  vocabId: string
  easeFactor: number    // starts at 2.5
  interval: number      // days until next review
  repetitions: number
  nextReview: string    // ISO date string
  lastRating?: 'again' | 'good' | 'easy'
}

interface ChecklistState {
  completed: Record<string, boolean> // checklistItemId → completed
  toggleItem: (id: string) => void
  isCompleted: (id: string) => boolean
  completedCount: (beltId: string, itemIds: string[]) => number
}

interface SRState {
  cards: Record<string, CardRecord> // vocabId → record
  rateCard: (vocabId: string, rating: 'again' | 'good' | 'easy') => void
  getCard: (vocabId: string) => CardRecord
  getDueCards: (vocabIds: string[]) => string[]
}

// ── Checklist store ──────────────────────────────────────────────────────

export const useChecklistStore = create<ChecklistState>()(
  persist(
    (set, get) => ({
      completed: {},

      toggleItem: (id) =>
        set((state) => ({
          completed: { ...state.completed, [id]: !state.completed[id] },
        })),

      isCompleted: (id) => get().completed[id] ?? false,

      completedCount: (_beltId, itemIds) =>
        itemIds.filter((id) => get().completed[id]).length,
    }),
    { name: 'tkd-checklist-store' }
  )
)

// ── Spaced-repetition store ──────────────────────────────────────────────

function defaultCard(vocabId: string): CardRecord {
  return {
    vocabId,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReview: new Date().toISOString(),
  }
}

function sm2(
  card: CardRecord,
  rating: 'again' | 'good' | 'easy'
): CardRecord {
  let { easeFactor, interval, repetitions } = card

  if (rating === 'again') {
    repetitions = 0
    interval = 1
    easeFactor = Math.max(1.3, easeFactor - 0.2)
  } else if (rating === 'good') {
    if (repetitions === 0) interval = 1
    else if (repetitions === 1) interval = 6
    else interval = Math.round(interval * easeFactor)
    repetitions += 1
  } else {
    // easy
    if (repetitions === 0) interval = 1
    else if (repetitions === 1) interval = 6
    else interval = Math.round(interval * easeFactor * 1.3)
    repetitions += 1
    easeFactor = Math.min(3.0, easeFactor + 0.15)
  }

  const nextReview = new Date()
  nextReview.setDate(nextReview.getDate() + interval)

  return { ...card, easeFactor, interval, repetitions, nextReview: nextReview.toISOString(), lastRating: rating }
}

export const useSRStore = create<SRState>()(
  persist(
    (set, get) => ({
      cards: {},

      rateCard: (vocabId, rating) => {
        const existing = get().cards[vocabId] ?? defaultCard(vocabId)
        const updated = sm2(existing, rating)
        set((state) => ({ cards: { ...state.cards, [vocabId]: updated } }))
      },

      getCard: (vocabId) => get().cards[vocabId] ?? defaultCard(vocabId),

      getDueCards: (vocabIds) => {
        const now = new Date()
        return vocabIds.filter((id) => {
          const card = get().cards[id]
          if (!card) return true // never seen = due
          return new Date(card.nextReview) <= now
        })
      },
    }),
    { name: 'tkd-sr-store' }
  )
)
