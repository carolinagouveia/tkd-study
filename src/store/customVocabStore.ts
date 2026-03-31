import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { get, set, del } from 'idb-keyval'
import type { Vocabulary, VocabCategory } from '../data/schema'

// ── idb-keyval adapter for Zustand persist ──────────────────────────────────

const idbStorage = {
  getItem: async (name: string) => {
    const value = await get<string>(name)
    return value ?? null
  },
  setItem: async (name: string, value: string) => {
    await set(name, value)
  },
  removeItem: async (name: string) => {
    await del(name)
  },
}

// ── Custom vocab card (extends Vocabulary with a custom flag) ───────────────

export interface CustomVocab extends Vocabulary {
  custom: true
  createdAt: string   // ISO date
}

export type CustomVocabDraft = {
  korean: string
  romanized: string
  portuguese: string
  category: VocabCategory
  beltId: string
  notes?: string
}

// ── Store ───────────────────────────────────────────────────────────────────

interface CustomVocabState {
  cards: Record<string, CustomVocab>   // keyed by id

  addCard: (draft: CustomVocabDraft) => string   // returns new id
  updateCard: (id: string, patch: Partial<CustomVocabDraft>) => void
  deleteCard: (id: string) => void
  getCardsForBelt: (beltId: string) => CustomVocab[]
  getAllCards: () => CustomVocab[]
}

function generateId(): string {
  return `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

export const useCustomVocabStore = create<CustomVocabState>()(
  persist(
    (set, get) => ({
      cards: {},

      addCard(draft) {
        const id = generateId()
        const card: CustomVocab = {
          ...draft,
          id,
          custom: true,
          createdAt: new Date().toISOString(),
        }
        set((s) => ({ cards: { ...s.cards, [id]: card } }))
        return id
      },

      updateCard(id, patch) {
        set((s) => {
          const existing = s.cards[id]
          if (!existing) return s
          return { cards: { ...s.cards, [id]: { ...existing, ...patch } } }
        })
      },

      deleteCard(id) {
        set((s) => {
          const next = { ...s.cards }
          delete next[id]
          return { cards: next }
        })
      },

      getCardsForBelt(beltId) {
        return Object.values(get().cards).filter((c) => c.beltId === beltId)
      },

      getAllCards() {
        return Object.values(get().cards)
      },
    }),
    {
      name: 'tkd-custom-vocab',
      storage: createJSONStorage(() => idbStorage),
    },
  ),
)
