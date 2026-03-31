import { motion, AnimatePresence } from 'framer-motion'
import type { PoomseStep } from '../../data/schema'
import { Badge } from '../ui/Badge'

const directionLabels: Record<string, string> = {
  N:  'Norte ↑',  NE: 'Nordeste ↗', E:  'Este →',
  SE: 'Sudeste ↘', S:  'Sul ↓',     SW: 'Sudoeste ↙',
  W:  'Oeste ←',  NW: 'Noroeste ↖',
}

const stanceLabels: Record<string, string> = {
  'ap-kubi':        'Ap Kubi',
  'ap-seogi':       'Ap Seogi',
  'moa-seogi':      'Moa Seogi',
  'naranhi-seogi':  'Naranhi Seogi',
  'dwit-kubi':      'Dwit Kubi',
  'tchariot-sogui': 'Tchariot-Sogui',
  'narahni-sogui':  'Narahni-Sogui',
  'kima-sogui':     'Kima-Sogui',
  'tchongul-sogui': 'Tchongul-Sogui',
}

interface PoomseStepCardProps {
  step: PoomseStep
  stepIndex: number
}

export function PoomseStepCard({ step, stepIndex }: PoomseStepCardProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepIndex}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="bg-white dark:bg-gray-900 rounded-3xl shadow-card dark:shadow-card-dark p-5 flex flex-col gap-4"
      >
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-accent-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-extrabold text-sm">{step.stepNumber}</span>
            </div>
            <div>
              <p className="font-extrabold text-gray-900 dark:text-gray-50 leading-snug">
                {step.technique}
                {step.kiap && <span className="ml-2 text-base">🔊</span>}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                {stanceLabels[step.stance] ?? step.stance}
              </p>
            </div>
          </div>
          <Badge color="accent" className="flex-shrink-0 mt-0.5">
            {directionLabels[step.direction] ?? step.direction}
          </Badge>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          {step.description}
        </p>

        {/* Kiap callout */}
        {step.kiap && (
          <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 rounded-xl px-3 py-2">
            <span className="text-lg">🔊</span>
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-400">
              KIAP! — Emite o grito de força neste movimento.
            </p>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
