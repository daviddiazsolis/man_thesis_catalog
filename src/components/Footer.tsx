// SPDX-License-Identifier: Apache-2.0
import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="border-t border-line py-10 bg-bg-2">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-fg-2 text-sm">
            {t('footerCreatedBy')}{' '}
            <a href="https://daviddiazsolis.com" target="_blank" rel="noopener noreferrer" className="text-fg font-semibold hover:text-accent">David Díaz Solís, Ph.D.</a>
          </p>
          <p className="text-muted text-xs mt-0.5">{t('footerRole')}</p>
          <p className="text-muted-2 text-xs mt-2 italic max-w-xl">{t('footerNote')}</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono text-muted">
          <a href="https://fen.uchile.cl" target="_blank" rel="noopener noreferrer" className="hover:text-fg">fen.uchile.cl</a>
          <a href="https://github.com/daviddiazsolis/man_thesis_catalog" target="_blank" rel="noopener noreferrer" className="hover:text-fg">github</a>
        </div>
      </div>
    </footer>
  )
}
