import { useNavigate } from 'react-router-dom'
import { useBeltStore } from '../../store/beltStore'
import { ThemeToggle } from './ThemeToggle'
import beltsData from '../../data/belts.json'
import type { Belt } from '../../data/schema'

const belts = beltsData as Belt[]

interface BeltHeaderProps {
  title?: string
}

export function BeltHeader({ title }: BeltHeaderProps) {
  const activeBeltId = useBeltStore((s) => s.activeBeltId)
  const navigate = useNavigate()

  const belt = belts.find((b) => b.id === activeBeltId)

  return (
    <header className="flex items-center justify-between px-4 pt-4 pb-2 sticky top-0 z-30 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      {/* Left: back or belt switcher */}
      <button
        onClick={() => navigate('/')}
        aria-label="Escolher faixa"
        className="tap-target flex items-center gap-2 -ml-1 rounded-xl px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        {belt && (
          <span
            className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600 flex-shrink-0"
            style={{ backgroundColor: belt.color }}
            aria-hidden="true"
          />
        )}
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 truncate max-w-[140px]">
          {title ?? belt?.namePt ?? 'TKD Study'}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 flex-shrink-0">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      <ThemeToggle />
    </header>
  )
}
