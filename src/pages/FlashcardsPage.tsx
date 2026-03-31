import { useNavigate, useParams } from 'react-router-dom'
import { useBeltContent } from '../hooks/useBelt'
import { useFlashcards } from '../hooks/useFlashcards'
import { FlipAnimation, SlideTransition } from '../components/flashcard/FlipAnimation'
import { CardFront, CardBack } from '../components/flashcard/FlashcardFace'
import { CardRatingBar } from '../components/flashcard/CardRatingBar'
import { DeckProgress } from '../components/flashcard/DeckProgress'
import { CategoryFilter } from '../components/flashcard/CategoryFilter'
import { SessionSummary } from '../components/flashcard/SessionSummary'
import { Spinner } from '../components/ui/Spinner'
import { EmptyState } from '../components/ui/EmptyState'

export function FlashcardsPage() {
  const { beltId } = useParams<{ beltId: string }>()
  const navigate = useNavigate()
  const { content, loading } = useBeltContent(beltId ?? null)
  const deck = useFlashcards(content?.vocabulary ?? [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Spinner />
      </div>
    )
  }

  if (!content || content.vocabulary.length === 0) {
    return <EmptyState icon="🗂️" title="Sem vocabulário" description="Ainda não há termos para esta faixa." />
  }

  if (deck.isDone) {
    return (
      <div className="px-4 pt-4">
        <SessionSummary
          stats={deck.stats}
          onRestart={deck.restart}
          onBack={() => navigate(`/belt/${beltId}`)}
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 px-4 pt-4">
      {/* Study mode toggle */}
      <div className="flex rounded-2xl bg-gray-100 dark:bg-gray-800 p-1 gap-1">
        {(['all', 'due'] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => deck.setStudyMode(mode)}
            className={[
              'flex-1 py-2 rounded-xl text-sm font-semibold transition-colors',
              deck.studyMode === mode
                ? 'bg-white dark:bg-gray-900 text-accent-600 dark:text-accent-400 shadow-sm'
                : 'text-gray-500 dark:text-gray-400',
            ].join(' ')}
          >
            {mode === 'all'
              ? `Todos (${content.vocabulary.length})`
              : `Para rever${deck.dueCount > 0 ? ` (${deck.dueCount})` : ''}`}
          </button>
        ))}
      </div>

      {/* Progress */}
      <DeckProgress current={deck.index + 1} total={deck.total} />

      {/* Category filter */}
      <CategoryFilter
        vocab={content.vocabulary}
        active={deck.activeCategory}
        onChange={deck.setCategory}
      />

      {/* Card */}
      {deck.current && (
        <SlideTransition cardKey={deck.current.id}>
          <FlipAnimation
            isFlipped={deck.isFlipped}
            onFlip={deck.flip}
            front={<CardFront vocab={deck.current} />}
            back={<CardBack vocab={deck.current} />}
          />
        </SlideTransition>
      )}

      {!deck.isFlipped && (
        <p className="text-center text-xs text-gray-400 dark:text-gray-600 -mt-1">
          Toca no cartão para ver a tradução
        </p>
      )}

      <CardRatingBar visible={deck.isFlipped} onRate={deck.rate} />
    </div>
  )
}
