import { motion } from 'framer-motion'
import type { CountingNumber } from '../../data/schema'

interface CountingGridProps {
  numbers: CountingNumber[]
  active: number | null
  onSelect: (n: CountingNumber) => void
  onSpeak: (n: CountingNumber) => void
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
}
const item = {
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.25 } },
}

export function CountingGrid({ numbers, active, onSelect, onSpeak }: CountingGridProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-5 gap-2"
    >
      {numbers.map((n) => {
        const isActive = active === n.number
        return (
          <motion.button
            key={n.number}
            variants={item}
            onClick={() => {
              onSelect(n)
              onSpeak(n)  // speak on tap — synchronous inside onClick for iOS Safari
            }}
            className={[
              'flex flex-col items-center justify-center py-3 rounded-2xl font-bold transition-all tap-target',
              isActive
                ? 'bg-accent-500 text-white scale-105 shadow-md'
                : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-card dark:shadow-card-dark hover:bg-accent-50 dark:hover:bg-gray-800',
            ].join(' ')}
          >
            <span className="text-lg leading-tight">{n.korean}</span>
            <span className={`text-[10px] mt-0.5 ${isActive ? 'text-accent-100' : 'text-gray-400 dark:text-gray-500'}`}>
              {n.number}
            </span>
          </motion.button>
        )
      })}
    </motion.div>
  )
}
