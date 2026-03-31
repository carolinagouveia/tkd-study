import type { ReactElement } from 'react'
import { NavLink, useParams } from 'react-router-dom'

interface NavItem {
  label: string
  icon: ReactElement
  to: string
}

function HomeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  )
}
function CardIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2"/>
      <line x1="2" y1="10" x2="22" y2="10"/>
    </svg>
  )
}
function MoveIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3"/>
      <path d="M12 11v8M9 19l3-2 3 2"/>
      <line x1="6" y1="14" x2="9" y2="16"/>
      <line x1="18" y1="14" x2="15" y2="16"/>
    </svg>
  )
}
function PoomseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  )
}
function ListIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6"/>
      <line x1="8" y1="12" x2="21" y2="12"/>
      <line x1="8" y1="18" x2="21" y2="18"/>
      <line x1="3" y1="6" x2="3.01" y2="6"/>
      <line x1="3" y1="12" x2="3.01" y2="12"/>
      <line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
  )
}

export function BottomNav() {
  const { beltId } = useParams()

  if (!beltId) return null

  const navItems: NavItem[] = [
    { label: 'Início',      icon: <HomeIcon />,   to: `/belt/${beltId}` },
    { label: 'Vocabulário', icon: <CardIcon />,   to: `/belt/${beltId}/vocabulario` },
    { label: 'Movimentos',  icon: <MoveIcon />,   to: `/belt/${beltId}/movimentos` },
    { label: 'Poomse',      icon: <PoomseIcon />, to: `/belt/${beltId}/poomse` },
    { label: 'Exame',       icon: <ListIcon />,   to: `/belt/${beltId}/checklist` },
  ]

  return (
    <nav
      aria-label="Navegação principal"
      className="fixed bottom-0 left-0 right-0 z-40 flex bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-t border-gray-100 dark:border-gray-800"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === `/belt/${beltId}`}
          className={({ isActive }) =>
            [
              'flex-1 flex flex-col items-center justify-center gap-0.5 py-2 tap-target transition-colors',
              isActive
                ? 'text-accent-500 dark:text-accent-400'
                : 'text-gray-400 dark:text-gray-600',
            ].join(' ')
          }
        >
          {item.icon}
          <span className="text-[10px] font-semibold leading-tight">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
