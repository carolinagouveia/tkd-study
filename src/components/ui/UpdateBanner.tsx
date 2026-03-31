import { useRegisterSW } from 'virtual:pwa-register/react'
import { motion, AnimatePresence } from 'framer-motion'

export function UpdateBanner() {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW()

  return (
    <AnimatePresence>
      {needRefresh && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          className="fixed bottom-20 left-4 right-4 z-50 max-w-lg mx-auto bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-2xl shadow-lg px-4 py-3 flex items-center justify-between gap-3"
        >
          <p className="text-sm font-semibold">
            Nova versão disponível 🎉
          </p>
          <button
            onClick={() => updateServiceWorker(true)}
            className="flex-shrink-0 px-3 py-1.5 bg-accent-500 text-white rounded-xl text-xs font-bold hover:bg-accent-600 transition-colors"
          >
            Actualizar
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
