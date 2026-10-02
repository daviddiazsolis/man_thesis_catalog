// SPDX-License-Identifier: Apache-2.0
import { useState, useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import TranslationWidget from './components/TranslationWidget'
import Hero from './components/Hero'
import Catalog from './components/Catalog'
import About from './components/About'
import Footer from './components/Footer'

function NavBar() {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])
  const links = [
    { href: '#catalog', label: t('navCatalog') },
    { href: '#about', label: t('navAbout') },
    { href: 'https://www.postgradofen.uchile.cl/magister-en-analitica-de-negocios', label: t('navProgram'), ext: true },
  ]
  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-bg/90 backdrop-blur border-b border-line py-3' : 'py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between pl-40 sm:pl-44">
        <a href="#" className={`font-black text-lg tracking-tight ${scrolled ? 'text-fg' : 'text-white'}`}>
          MAN<span className="text-fen-gold">·</span>FEN<span className="text-fen-gold">+</span>FCFM
          <span className={`font-normal text-sm ml-2 hidden sm:inline ${scrolled ? 'text-muted' : 'text-white/70'}`}>Universidad de Chile</span>
        </a>
        <nav className="hidden sm:flex items-center gap-1">
          {links.map(l => (
            <a key={l.href} href={l.href} target={l.ext ? '_blank' : undefined} rel={l.ext ? 'noopener noreferrer' : undefined}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${scrolled ? 'text-muted hover:text-fg hover:bg-surface-2' : 'text-white/80 hover:text-white hover:bg-white/10'}`}>
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

function AppInner() {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <TranslationWidget />
      <NavBar />
      <Hero />
      <Catalog />
      <About />
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppInner />
      </LanguageProvider>
    </ThemeProvider>
  )
}
