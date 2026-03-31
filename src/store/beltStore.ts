import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface BeltState {
  activeBeltId: string | null
  unlockedBeltIds: string[]
  setActiveBelt: (id: string) => void
  unlockBelt: (id: string) => void
  getBeltProgress: (beltId: string) => number // 0–100
}

// Progress is stored separately in checklistStore; this store tracks unlock state.
export const useBeltStore = create<BeltState>()(
  persist(
    (set) => ({
      activeBeltId: null,
      unlockedBeltIds: ['branca'],

      setActiveBelt: (id) => set({ activeBeltId: id }),

      unlockBelt: (id) =>
        set((state) => ({
          unlockedBeltIds: state.unlockedBeltIds.includes(id)
            ? state.unlockedBeltIds
            : [...state.unlockedBeltIds, id],
        })),

      getBeltProgress: () => 0, // implemented via selector in useChecklist
    }),
    { name: 'tkd-belt-store' }
  )
)
