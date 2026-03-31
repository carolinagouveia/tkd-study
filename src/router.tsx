import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppShell } from './components/shell/AppShell'
import { BeltSelectPage } from './pages/BeltSelectPage'
import { DashboardPage } from './pages/DashboardPage'
import { FlashcardsPage } from './pages/FlashcardsPage'
import { MovementsPage } from './pages/MovementsPage'
import { PoomsePage } from './pages/PoomsePage'
import { ChecklistPage } from './pages/ChecklistPage'
import { CountingPage } from './pages/CountingPage'
import { InstructorPage } from './pages/InstructorPage'

export const router = createBrowserRouter([
  // Belt-select has its own layout (no bottom nav)
  {
    path: '/',
    element: <BeltSelectPage />,
  },
  // All belt screens share AppShell (header + bottom nav)
  {
    path: '/belt/:beltId',
    element: <AppShell />,
    children: [
      { index: true,           element: <DashboardPage /> },
      { path: 'vocabulario',   element: <FlashcardsPage /> },
      { path: 'movimentos',    element: <MovementsPage /> },
      { path: 'poomse',        element: <PoomsePage /> },
      { path: 'checklist',     element: <ChecklistPage /> },
      { path: 'contar',        element: <CountingPage /> },
      { path: 'instrutor',     element: <InstructorPage /> },
    ],
  },
  // Fallback
  { path: '*', element: <Navigate to="/" replace /> },
])
