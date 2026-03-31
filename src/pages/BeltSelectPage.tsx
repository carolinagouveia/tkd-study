import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useBeltStore } from '../store/beltStore'
import { ThemeToggle } from '../components/shell/ThemeToggle'
import beltsData from '../data/belts.json'
import type { Belt } from '../data/schema'

const belts = beltsData as Belt[]

// ── Layout constants ──────────────────────────────────────────────────────────
const NODE_SIZE = 80     // circle diameter in px
const V_SPACING = 148    // vertical distance between node centres
const TOP_PAD   = 88     // space above first node (room for tooltip + ring)
const BOT_PAD   = 72     // space below last node
const REF_W     = 400    // SVG reference width (nodes use X% → same scale)

const TOTAL_HEIGHT = TOP_PAD + (belts.length - 1) * V_SPACING + NODE_SIZE + BOT_PAD

// Zigzag X as fraction of container width — forms a double S-curve for 11 nodes
const X_PCT = [0.50, 0.65, 0.75, 0.68, 0.55, 0.50, 0.45, 0.32, 0.25, 0.38, 0.50]

// Node centres in SVG reference space (x in REF_W units, y in px)
const CENTERS = belts.map((_, i) => ({
  x: X_PCT[i] * REF_W,
  y: TOP_PAD + i * V_SPACING + NODE_SIZE / 2,
}))

// ── Icons ─────────────────────────────────────────────────────────────────────

function CheckIcon({ color }: { color: string }) {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className="text-gray-400 dark:text-gray-600">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export function BeltSelectPage() {
  const navigate = useNavigate()
  const { unlockedBeltIds, activeBeltId, setActiveBelt } = useBeltStore()

  // The "current" belt gets the ENTRAR tooltip + pulsing ring
  const currentBeltId =
    activeBeltId && unlockedBeltIds.includes(activeBeltId)
      ? activeBeltId
      : unlockedBeltIds[unlockedBeltIds.length - 1]

  function handleSelect(belt: Belt) {
    if (!unlockedBeltIds.includes(belt.id)) return
    setActiveBelt(belt.id)
    navigate(`/belt/${belt.id}`)
  }

  return (
    <div className="min-h-dvh bg-gray-50 dark:bg-gray-950 flex flex-col">

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-5 py-4
                      bg-gray-50/90 dark:bg-gray-950/90 backdrop-blur-sm
                      border-b border-gray-100 dark:border-gray-800/50">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-gray-50 leading-tight">
            TKD Study
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Escolhe a tua faixa para começar
          </p>
        </div>
        <ThemeToggle />
      </div>

      {/* ── Scrollable timeline ──────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto scrollbar-none">
        <div
          className="relative mx-auto"
          style={{ height: TOTAL_HEIGHT, maxWidth: REF_W }}
        >

          {/* SVG connector paths — drawn behind the nodes */}
          <svg
            className="absolute inset-0 w-full pointer-events-none"
            height={TOTAL_HEIGHT}
            viewBox={`0 0 ${REF_W} ${TOTAL_HEIGHT}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {belts.map((_, i) => {
              if (i === 0) return null
              const p = CENTERS[i - 1]
              const c = CENTERS[i]
              const midY = (p.y + c.y) / 2
              const bothUnlocked =
                unlockedBeltIds.includes(belts[i - 1].id) &&
                unlockedBeltIds.includes(belts[i].id)
              return (
                <path
                  key={i}
                  d={`M ${p.x} ${p.y} C ${p.x} ${midY}, ${c.x} ${midY}, ${c.x} ${c.y}`}
                  className={
                    bothUnlocked
                      ? 'stroke-indigo-300 dark:stroke-indigo-700'
                      : 'stroke-gray-200 dark:stroke-gray-800'
                  }
                  strokeWidth={6}
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray={bothUnlocked ? undefined : '10 7'}
                />
              )
            })}
          </svg>

          {/* Belt nodes */}
          {belts.map((belt, i) => {
            const locked     = !unlockedBeltIds.includes(belt.id)
            const isActive   = !locked && belt.id === currentBeltId
            // "complete" proxy: this belt is unlocked AND the next one is too
            const isComplete = !locked && i < belts.length - 1
                                && unlockedBeltIds.includes(belts[i + 1].id)

            return (
              <motion.div
                key={belt.id}
                className="absolute"
                style={{
                  left: `calc(${X_PCT[i] * 100}% - ${NODE_SIZE / 2}px)`,
                  top: CENTERS[i].y - NODE_SIZE / 2,
                  width: NODE_SIZE,
                  height: NODE_SIZE,
                }}
                initial={{ opacity: 0, scale: 0.45 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: i * 0.07,
                  duration: 0.4,
                  type: 'spring',
                  stiffness: 220,
                  damping: 18,
                }}
              >
                {/* ENTRAR tooltip — floats above the active node */}
                {isActive && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap
                                bg-white dark:bg-gray-800 border-2 rounded-xl
                                px-3 py-1 text-xs font-extrabold shadow-md z-10"
                    style={{
                      bottom: NODE_SIZE + 10,
                      borderColor: belt.accentColor,
                      color: belt.accentColor,
                    }}
                  >
                    ENTRAR
                    {/* Downward caret */}
                    <span
                      className="absolute -bottom-[7px] left-1/2 -translate-x-1/2
                                  w-3 h-3 rotate-45 bg-white dark:bg-gray-800
                                  border-r-2 border-b-2"
                      style={{ borderColor: belt.accentColor }}
                    />
                  </div>
                )}

                {/* Pulsing ring — draws attention to the active node */}
                {isActive && (
                  <motion.div
                    className="absolute rounded-full border-[4px] pointer-events-none"
                    style={{ inset: -9, borderColor: belt.accentColor }}
                    animate={{ scale: [1, 1.24, 1], opacity: [0.65, 0, 0.65] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}

                {/* The circle itself */}
                <button
                  onClick={() => handleSelect(belt)}
                  disabled={locked}
                  className={[
                    'w-full h-full rounded-full flex flex-col items-center justify-center gap-0.5',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                    'transition-transform duration-100',
                    locked
                      ? 'bg-gray-200 dark:bg-gray-800 cursor-not-allowed'
                      : 'cursor-pointer active:scale-95 shadow-lg',
                    isActive ? 'shadow-xl' : '',
                  ].join(' ')}
                  style={locked ? undefined : { backgroundColor: belt.color }}
                  aria-label={`${belt.namePt}${locked ? ' (bloqueada)' : ''}`}
                >
                  {locked ? (
                    <>
                      <LockIcon />
                      <span className="text-[9px] font-bold leading-none text-center px-1 text-gray-500 dark:text-gray-400">
                        {belt.colorName}
                      </span>
                      <span className="text-[8px] font-medium leading-none text-gray-400 dark:text-gray-600">
                        {belt.kup}
                      </span>
                    </>
                  ) : isComplete ? (
                    <CheckIcon color={belt.textColor} />
                  ) : (
                    <>
                      <span
                        className="text-base font-extrabold leading-none"
                        style={{ color: belt.textColor }}
                      >
                        {belt.nameKorean}
                      </span>
                      <span
                        className="text-[11px] font-semibold leading-none opacity-75"
                        style={{ color: belt.textColor }}
                      >
                        {belt.name}
                      </span>
                    </>
                  )}
                </button>

              </motion.div>
            )
          })}

        </div>
      </div>
    </div>
  )
}
