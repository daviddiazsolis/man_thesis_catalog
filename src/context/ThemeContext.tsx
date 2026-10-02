// SPDX-License-Identifier: Apache-2.0
import React, { createContext, useContext, useState, useEffect } from 'react'
type Theme = 'dark' | 'light'
interface ThemeContextType { theme: Theme; toggleTheme: () => void }
const ThemeContext = createContext<ThemeContextType | null>(null)
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    try { return (localStorage.getItem('man-catalog-theme') as Theme) || 'light' } catch { return 'light' }
  })
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try { localStorage.setItem('man-catalog-theme', theme) } catch { /* ignore */ }
  }, [theme])
  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')
  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}
export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
