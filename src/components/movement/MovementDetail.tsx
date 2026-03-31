import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Movement } from '../../data/schema'
import { Badge } from '../ui/Badge'
import { AudioButton } from '../ui/AudioButton'
import { MovementAnimation } from './MovementAnimation'

interface MovementDetailProps {
  movement: Movement | null
  onClose: () => void
}

const stanceLabels: Record<string, string> = {
  'ap-kubi':           'Postura de avanço (Ap Kubi)',
  'ap-seogi':          'Postura de caminhada (Ap Seogi)',
  'moa-seogi':         'Pés juntos (Moa Seogi)',
  'naranhi-seogi':     'Postura paralela (Naranhi Seogi)',
  'dwit-kubi':         'Postura traseira (Dwit Kubi)',
  'tchariot-sogui':    'Posição de Atenção (Tchariot-Sogui)',
  'narahni-sogui':     'Posição Paralela (Narahni-Sogui)',
  'kima-sogui':        'Posição de Cavaleiro (Kima-Sogui)',
  'tchongul-sogui':    'Posição de Avanço (Tchongul-Sogui)',
}

export function MovementDetail({ movement, onClose }: MovementDetailProps) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <AnimatePresence>
      {movement && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            key="sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 rounded-t-3xl shadow-2xl max-h-[85dvh] overflow-y-auto"
            style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 1.5rem)' }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-gray-200 dark:bg-gray-700" />
            </div>

            <div className="px-5 pt-2 pb-6 flex flex-col gap-5">
              {/* Animated figure */}
              <div className="flex justify-center">
                <div className="w-36 h-40 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center overflow-hidden">
                  <MovementAnimation movementId={movement.id} className="w-32 h-36" />
                </div>
              </div>

              {/* Names */}
              <div className="text-center">
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-50">
                  {movement.name}
                </h2>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <p className="text-base text-gray-400 dark:text-gray-500">
                    {movement.nameKorean} · {movement.romanized}
                  </p>
                  <AudioButton text={movement.nameKorean} size="sm" />
                </div>
                <div className="flex justify-center mt-2">
                  <Badge color="gray">{stanceLabels[movement.stance] ?? movement.stance}</Badge>
                </div>
              </div>

              {/* Description */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4">
                <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                  Execução
                </p>
                <div className="space-y-2">
                  {movement.description.split('\n').map((line, i) => (
                    <p key={i} className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              {/* Tips */}
              {movement.tips && (
                <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-2xl p-4">
                  <p className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
                    💡 Dica do treinador
                  </p>
                  <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
                    {movement.tips}
                  </p>
                </div>
              )}

              {/* Close button */}
              <button
                onClick={onClose}
                className="w-full py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-semibold text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors tap-target"
              >
                Fechar
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
