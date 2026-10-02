// SPDX-License-Identifier: Apache-2.0
import { Sun, Moon } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'

export default function TranslationWidget() {
  const { language, setLanguage, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const btn = (l: 'en' | 'es') =>
    `px-3 py-1 rounded text-sm font-medium transition-colors ${language === l ? 'bg-accent text-accent-fg' : 'text-muted hover:text-fg'}`
  return (
    <div className="fixed top-4 left-4 z-50 flex items-center gap-2">
      <button onClick={toggleTheme} aria-label="theme"
        className="flex items-center justify-center w-9 h-9 rounded-lg bg-surface/90 backdrop-blur border border-line text-muted hover:text-fg transition-colors">
        {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>
      <div className="flex gap-1 bg-surface/90 backdrop-blur border border-line rounded-lg p-1">
        <button onClick={() => setLanguage('es')} className={btn('es')}>{t('langEs')}</button>
        <button onClick={() => setLanguage('en')} className={btn('en')}>{t('langEn')}</button>
      </div>
    </div>
  )
}
