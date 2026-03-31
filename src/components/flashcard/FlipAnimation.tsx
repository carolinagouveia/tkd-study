import type { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'

interface FlipAnimationProps {
  isFlipped: boolean
  front: ReactNode
  back: ReactNode
  onFlip: () => void
}

const cardVariants: Variants = {
  front: { rotateY: 0,   transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
  back:  { rotateY: 180, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
}

export function FlipAnimation({ isFlipped, front, back, onFlip }: FlipAnimationProps) {
  return (
    <div
      className="perspective w-full cursor-pointer select-none"
      onClick={onFlip}
      role="button"
      aria-label={isFlipped ? 'Ver frente do cartão' : 'Ver resposta'}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' || e.key === ' ' ? onFlip() : undefined}
    >
      <motion.div
        className="relative w-full preserve-3d"
        style={{ minHeight: 240 }}
        animate={isFlipped ? 'back' : 'front'}
        variants={cardVariants}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden">
          {front}
        </div>
        {/* Back — pre-rotated 180° so it appears when the container flips */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          {back}
        </div>
      </motion.div>
    </div>
  )
}

// Slide animation for card-to-card transitions
interface SlideTransitionProps {
  cardKey: string | number
  children: ReactNode
}

export function SlideTransition({ cardKey, children }: SlideTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={cardKey}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
