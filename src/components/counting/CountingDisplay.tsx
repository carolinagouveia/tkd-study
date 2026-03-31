import { motion, AnimatePresence } from 'framer-motion'
import type { CountingNumber } from '../../data/schema'

interface CountingDisplayProps {
  item: CountingNumber
  onSpeak: () => void
  speakSupported: boolean
}

export function CountingDisplay({ item, onSpeak, speakSupported }: CountingDisplayProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={item.number}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col items-center gap-2 py-6"
      >
        <p className="text-7xl font-black text-gray-900 dark:text-gray-50 leading-none">
          {item.korean}
        </p>
        <p className="text-2xl font-semibold text-accent-500">{item.romanized}</p>
        <p className="text-base text-gray-400 dark:text-gray-500">{item.portuguese}</p>
        <p className="text-4xl font-extrabold text-gray-200 dark:text-gray-700">{item.number}</p>

        {speakSupported && (
          <button
            onClick={onSpeak}
            className="mt-2 flex items-center gap-2 px-4 py-2 rounded-full bg-accent-50 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 font-semibold text-sm hover:bg-accent-100 dark:hover:bg-accent-900/50 transition-colors tap-target"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
            </svg>
            Ouvir
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
