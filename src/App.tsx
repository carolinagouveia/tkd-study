import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { useTheme, ThemeContext } from './hooks/useTheme'
import { UpdateBanner } from './components/ui/UpdateBanner'

export default function App() {
  const themeValue = useTheme()

  return (
    <ThemeContext.Provider value={themeValue}>
      <RouterProvider router={router} />
      <UpdateBanner />
    </ThemeContext.Provider>
  )
}
