import { Badge } from '../ui/Badge'
import { AudioButton } from '../ui/AudioButton'
import type { Vocabulary, VocabCategory } from '../../data/schema'

const categoryLabels: Record<VocabCategory, string> = {
  postura:  'Postura',
  tecnica:  'Técnica',
  contagem: 'Contagem',
  comando:  'Comando',
  conceito: 'Conceito',
  poomse:   'Poomse',
}

const categoryColors: Record<VocabCategory, 'accent' | 'green' | 'yellow' | 'gray'> = {
  postura:  'green',
  tecnica:  'accent',
  contagem: 'yellow',
  comando:  'gray',
  conceito: 'yellow',
  poomse:   'accent',
}

interface FrontProps { vocab: Vocabulary }
interface BackProps  { vocab: Vocabulary }

export function CardFront({ vocab }: FrontProps) {
  return (
    <div className="w-full min-h-[240px] bg-white dark:bg-gray-900 rounded-3xl shadow-card dark:shadow-card-dark flex flex-col items-center justify-center gap-3 p-8 text-center border border-gray-100 dark:border-gray-800 relative">
      {/* Audio button — top right, fires synchronously inside click (iOS safe) */}
      <div className="absolute top-3 right-3" onClick={(e) => e.stopPropagation()}>
        <AudioButton text={vocab.korean} audioFile={vocab.audioFile} size="sm" />
      </div>

      <p className="text-5xl font-extrabold text-gray-900 dark:text-gray-50 leading-tight tracking-tight">
        {vocab.korean}
      </p>
      <p className="text-lg text-gray-400 dark:text-gray-500 font-medium tracking-wide">
        {vocab.romanized}
      </p>
      <p className="text-xs text-gray-300 dark:text-gray-600 mt-2">
        Toca no cartão para ver a tradução
      </p>
    </div>
  )
}

export function CardBack({ vocab }: BackProps) {
  return (
    <div className="w-full min-h-[240px] bg-accent-500 rounded-3xl shadow-card flex flex-col items-center justify-center gap-3 p-8 text-center relative">
      {/* Audio on the back too */}
      <div className="absolute top-3 right-3" onClick={(e) => e.stopPropagation()}>
        <AudioButton text={vocab.korean} audioFile={vocab.audioFile} size="sm" variant="pill" />
      </div>

      <Badge color={categoryColors[vocab.category]} className="mb-1">
        {categoryLabels[vocab.category]}
      </Badge>
      <p className="text-3xl font-extrabold text-white leading-tight">
        {vocab.portuguese}
      </p>
      <p className="text-sm text-accent-100 font-medium">
        {vocab.korean} · {vocab.romanized}
      </p>
      {vocab.notes && (
        <p className="text-xs text-accent-200 mt-2 max-w-xs leading-relaxed border-t border-accent-400 pt-3">
          💡 {vocab.notes}
        </p>
      )}
    </div>
  )
}
