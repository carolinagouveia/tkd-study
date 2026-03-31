import type { Movement } from '../../data/schema'
import { Badge } from '../ui/Badge'
import { MovementAnimation } from './MovementAnimation'

interface MovementCardProps {
  movement: Movement
  onClick: () => void
}

const stanceLabels: Record<string, string> = {
  'ap-kubi':      'Postura de avanço',
  'ap-seogi':     'Postura de caminhada',
  'moa-seogi':    'Postura pés juntos',
  'naranhi-seogi':'Postura paralela',
  'dwit-kubi':    'Postura traseira',
}

export function MovementCard({ movement, onClick }: MovementCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-card dark:shadow-card-dark text-left transition-transform active:scale-[0.98] hover:shadow-md"
    >
      {/* Animated figure thumbnail */}
      <div className="w-16 h-16 rounded-xl bg-gray-50 dark:bg-gray-800 flex-shrink-0 flex items-center justify-center overflow-hidden">
        <MovementAnimation movementId={movement.id} className="w-14 h-20 object-contain" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-bold text-gray-900 dark:text-gray-100 leading-snug truncate">
          {movement.name}
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">
          {movement.nameKorean} · {movement.romanized}
        </p>
        <div className="mt-1.5">
          <Badge color="gray">
            {stanceLabels[movement.stance] ?? movement.stance}
          </Badge>
        </div>
      </div>

      {/* Chevron */}
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300 dark:text-gray-700 flex-shrink-0">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </button>
  )
}
