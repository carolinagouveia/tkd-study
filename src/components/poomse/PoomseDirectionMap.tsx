import { motion } from 'framer-motion'
import type { PoomseStep } from '../../data/schema'

interface PoomseDirectionMapProps {
  steps: PoomseStep[]
  currentIndex: number   // 0-based
}

// Arrow head pointing in each direction
const DIRECTION_ARROWS: Record<string, { rotate: number }> = {
  N:  { rotate: 0 },
  NE: { rotate: 45 },
  E:  { rotate: 90 },
  SE: { rotate: 135 },
  S:  { rotate: 180 },
  SW: { rotate: 225 },
  W:  { rotate: 270 },
  NW: { rotate: 315 },
}

// Compass labels
const COMPASS = [
  { label: 'N', x: 150, y: 18 },
  { label: 'S', x: 150, y: 288 },
  { label: 'O', x: 18,  y: 155 },
  { label: 'L', x: 282, y: 155 },
]

export function PoomseDirectionMap({ steps, currentIndex }: PoomseDirectionMapProps) {
  const current = steps[currentIndex]
  const visited = steps.slice(0, currentIndex + 1)

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-3 flex flex-col items-center gap-1">
      <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
        Padrão no chão — 工
      </p>
      <svg viewBox="0 0 300 310" className="w-full max-w-[240px]" aria-label="Mapa do padrão de chão da poomse">

        {/* ── Grid lines for the 工 shape ── */}
        {/* Top horizontal arm */}
        <line x1="65" y1="78" x2="235" y2="78" stroke="#e2e8f0" strokeWidth="1.5" className="dark:stroke-gray-700"/>
        {/* Vertical connector */}
        <line x1="150" y1="78" x2="150" y2="220" stroke="#e2e8f0" strokeWidth="1.5" className="dark:stroke-gray-700"/>
        {/* Bottom horizontal arm */}
        <line x1="65" y1="220" x2="235" y2="220" stroke="#e2e8f0" strokeWidth="1.5" className="dark:stroke-gray-700"/>
        {/* Bottom extension */}
        <line x1="150" y1="220" x2="150" y2="295" stroke="#e2e8f0" strokeWidth="1.5" className="dark:stroke-gray-700"/>

        {/* ── Compass labels ── */}
        {COMPASS.map(({ label, x, y }) => (
          <text key={label} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
            fontSize="10" fontWeight="600" fill="#94a3b8">
            {label}
          </text>
        ))}

        {/* ── Path trace (steps visited) ── */}
        {visited.length > 1 && visited.map((step, i) => {
          if (i === 0) return null
          const prev = visited[i - 1]
          return (
            <line
              key={`trace-${i}`}
              x1={prev.diagramX} y1={prev.diagramY}
              x2={step.diagramX} y2={step.diagramY}
              stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4 3"
              opacity="0.4"
            />
          )
        })}

        {/* ── All step dots (upcoming = faint) ── */}
        {steps.map((step, i) => {
          const isDone    = i < currentIndex
          const isCurrent = i === currentIndex
          return (
            <circle
              key={`dot-${i}`}
              cx={step.diagramX}
              cy={step.diagramY}
              r={isCurrent ? 0 : 4}
              fill={isDone ? '#a5b4fc' : '#e2e8f0'}
              className={isDone ? '' : 'dark:fill-gray-700'}
            />
          )
        })}

        {/* ── Current position dot (animated) ── */}
        <motion.g
          animate={{ x: current.diagramX - 150, y: current.diagramY - 185 }}
          transition={{ type: 'spring', stiffness: 200, damping: 24 }}
        >
          {/* Outer pulse ring */}
          <circle cx={150} cy={185} r={11} fill="#6366f1" opacity="0.2"/>
          {/* Main dot */}
          <circle cx={150} cy={185} r={7} fill="#6366f1"/>
          {/* Direction arrow */}
          <g transform={`rotate(${DIRECTION_ARROWS[current.direction]?.rotate ?? 0}, 150, 185)`}>
            <polygon points="150,170 146,178 154,178" fill="white"/>
          </g>
          {/* Step number */}
          <text x={150} y={185} textAnchor="middle" dominantBaseline="middle"
            fontSize="7" fontWeight="800" fill="white">
            {current.stepNumber}
          </text>
        </motion.g>

        {/* ── Kiap indicator at current step ── */}
        {current.kiap && (
          <text
            x={current.diagramX + 14}
            y={current.diagramY - 10}
            fontSize="10"
            textAnchor="middle"
          >
            🔊
          </text>
        )}
      </svg>
    </div>
  )
}
