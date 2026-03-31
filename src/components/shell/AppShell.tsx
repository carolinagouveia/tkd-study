import { Outlet, useParams, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { BottomNav } from './BottomNav'
import { BeltHeader } from './BeltHeader'
import { useBeltTheme } from '../../hooks/useBeltTheme'

export function AppShell() {
  const { beltId } = useParams()
  const location = useLocation()
  const hasBelt = Boolean(beltId)

  useBeltTheme(beltId)

  return (
    <div className="flex flex-col min-h-dvh bg-gray-50 dark:bg-gray-950">
      {hasBelt && <BeltHeader />}

      <main
        className={[
          'flex-1 w-full max-w-lg mx-auto',
          hasBelt ? 'pb-24' : '',
        ].join(' ')}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {hasBelt && <BottomNav />}
    </div>
  )
}
