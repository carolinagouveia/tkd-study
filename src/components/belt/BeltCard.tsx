import { motion } from 'framer-motion'
import type { Belt } from '../../data/schema'
import { ProgressRing } from '../ui/ProgressRing'

interface BeltCardProps {
  belt: Belt
  locked: boolean
  progress: number  // 0–100
  onClick: () => void
}

export function BeltCard({ belt, locked, progress, onClick }: BeltCardProps) {
  return (
    <motion.button
      onClick={locked ? undefined : onClick}
      disabled={locked}
      whileTap={locked ? {} : { scale: 0.96 }}
      className={[
        'relative w-full flex flex-col items-center gap-3 p-4 rounded-3xl text-left transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        locked
          ? 'bg-gray-100 dark:bg-gray-800/60 cursor-not-allowed border border-gray-200 dark:border-gray-700/50'
          : 'bg-white dark:bg-gray-900 shadow-card dark:shadow-card-dark hover:shadow-md cursor-pointer border border-transparent',
      ].join(' ')}
      aria-label={`${belt.namePt}${locked ? ' (bloqueada)' : ''}`}
    >
      {/* Belt color swatch */}
      <div
        className={`w-full h-10 rounded-xl flex items-center justify-center ${locked ? 'bg-gray-200 dark:bg-gray-700/50' : ''}`}
        style={{ backgroundColor: locked ? undefined : belt.color }}
      >
        {locked ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 dark:text-gray-600">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        ) : (
          <span className="text-xs font-bold" style={{ color: belt.textColor }}>
            {belt.nameKorean}
          </span>
        )}
      </div>

      {/* Name */}
      <div className="w-full">
        <p className={`text-sm font-bold leading-tight ${locked ? 'text-gray-400 dark:text-gray-600' : 'text-gray-900 dark:text-gray-100'}`}>
          {belt.namePt}
        </p>
        <p className={`text-xs mt-0.5 ${locked ? 'text-gray-300 dark:text-gray-700' : 'text-gray-400 dark:text-gray-500'}`}>
          Nível {belt.order}
        </p>
      </div>

      {/* Progress ring (only for unlocked) */}
      {!locked && (
        <div className="absolute top-3 right-3">
          <ProgressRing value={progress} size={32} strokeWidth={3} />
        </div>
      )}
    </motion.button>
  )
}
