import { useState, useCallback, useMemo } from 'react'
import type { Vocabulary, VocabCategory } from '../data/schema'
import { useSRStore } from '../store/srStore'

export type Rating = 'again' | 'good' | 'easy'

export interface SessionStats {
  total: number
  again: number
  good: number
  easy: number
}

export interface UseFlashcardsReturn {
  current: Vocabulary | null
  index: number
  total: number
  dueCount: number
  isFlipped: boolean
  isDone: boolean
  stats: SessionStats
  activeCategory: VocabCategory | 'all'
  studyMode: 'all' | 'due'

  flip: () => void
  rate: (r: Rating) => void
  setCategory: (c: VocabCategory | 'all') => void
  setStudyMode: (m: 'all' | 'due') => void
  restart: () => void
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function useFlashcards(vocab: Vocabulary[]): UseFlashcardsReturn {
  const { rateCard, getDueCards } = useSRStore()

  const [activeCategory, setActiveCategory] = useState<VocabCategory | 'all'>('all')
  const [studyMode, setStudyMode] = useState<'all' | 'due'>('all')
  const [deck, setDeck] = useState<Vocabulary[]>(() => buildDeck(vocab, 'all', getDueCards))
  const [index, setIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [stats, setStats] = useState<SessionStats>({ total: 0, again: 0, good: 0, easy: 0 })

  const allVocabIds = useMemo(() => vocab.map((v) => v.id), [vocab])
  const dueCount = useMemo(() => getDueCards(allVocabIds).length, [getDueCards, allVocabIds])

  const filtered = useMemo(
    () => (activeCategory === 'all' ? deck : deck.filter((v) => v.category === activeCategory)),
    [deck, activeCategory]
  )

  const current = filtered[index] ?? null
  const isDone  = index >= filtered.length

  const flip = useCallback(() => setIsFlipped((f) => !f), [])

  const rate = useCallback(
    (r: Rating) => {
      if (current) rateCard(current.id, r)
      setStats((s) => ({ ...s, total: s.total + 1, [r]: s[r] + 1 }))
      setIsFlipped(false)
      setTimeout(() => setIndex((i) => i + 1), 150)
    },
    [current, rateCard]
  )

  const handleSetCategory = useCallback((c: VocabCategory | 'all') => {
    setActiveCategory(c)
    setIndex(0)
    setIsFlipped(false)
    setDeck((d) => shuffle(d))
  }, [])

  const handleSetStudyMode = useCallback((m: 'all' | 'due') => {
    setStudyMode(m)
    setIndex(0)
    setIsFlipped(false)
    setDeck(buildDeck(vocab, m, getDueCards))
  }, [vocab, getDueCards])

  const restart = useCallback(() => {
    setIndex(0)
    setIsFlipped(false)
    setStats({ total: 0, again: 0, good: 0, easy: 0 })
    setDeck(buildDeck(vocab, studyMode, getDueCards))
  }, [vocab, studyMode, getDueCards])

  return {
    current,
    index,
    total: filtered.length,
    dueCount,
    isFlipped,
    isDone,
    stats,
    activeCategory,
    studyMode,
    flip,
    rate,
    setCategory: handleSetCategory,
    setStudyMode: handleSetStudyMode,
    restart,
  }
}

function buildDeck(
  vocab: Vocabulary[],
  mode: 'all' | 'due',
  getDueCards: (ids: string[]) => string[]
): Vocabulary[] {
  if (mode === 'due') {
    const ids = getDueCards(vocab.map((v) => v.id))
    const due = vocab.filter((v) => ids.includes(v.id))
    return shuffle(due.length > 0 ? due : vocab)  // fallback to all if none due
  }
  // 'all' mode: due cards first, then the rest
  const ids    = new Set(getDueCards(vocab.map((v) => v.id)))
  const due    = shuffle(vocab.filter((v) => ids.has(v.id)))
  const notDue = shuffle(vocab.filter((v) => !ids.has(v.id)))
  return [...due, ...notDue]
}
