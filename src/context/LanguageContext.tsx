// SPDX-License-Identifier: Apache-2.0
import React, { createContext, useContext, useState, useEffect } from 'react'
import { translations, Language } from '../i18n'
interface LanguageContextType { language: Language; setLanguage: (l: Language) => void; t: (key: string) => string }
const LanguageContext = createContext<LanguageContextType | null>(null)
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    try { return (localStorage.getItem('man-catalog-lang') as Language) || 'es' } catch { return 'es' }
  })
  useEffect(() => {
    document.documentElement.lang = language
    try { localStorage.setItem('man-catalog-lang', language) } catch { /* ignore */ }
  }, [language])
  const t = (key: string): string => translations[language][key] || key
  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}
export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
