import type { VocabCategory } from '../../data/schema'
import type { Vocabulary } from '../../data/schema'

const ALL_LABEL = 'Todos'

const categoryLabels: Record<VocabCategory, string> = {
  postura:  'Posturas',
  tecnica:  'Técnicas',
  contagem: 'Contagem',
  comando:  'Comandos',
  conceito: 'Conceitos',
  poomse:   'Poomse',
}

interface CategoryFilterProps {
  vocab: Vocabulary[]
  active: VocabCategory | 'all'
  onChange: (c: VocabCategory | 'all') => void
}

export function CategoryFilter({ vocab, active, onChange }: CategoryFilterProps) {
  const presentCategories = Array.from(new Set(vocab.map((v) => v.category))) as VocabCategory[]

  if (presentCategories.length <= 1) return null

  const chips: { value: VocabCategory | 'all'; label: string }[] = [
    { value: 'all', label: ALL_LABEL },
    ...presentCategories.map((c) => ({ value: c, label: categoryLabels[c] })),
  ]

  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1 -mx-4 px-4">
      {chips.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={[
            'flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-semibold transition-colors whitespace-nowrap',
            active === value
              ? 'bg-accent-500 text-white'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700',
          ].join(' ')}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
