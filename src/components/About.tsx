// SPDX-License-Identifier: Apache-2.0
import { motion } from 'motion/react'
import { Library, GraduationCap, Mail, ExternalLink } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { REPOSITORY_COLLECTION_URL } from '../data'

export default function About() {
  const { t } = useLanguage()
  const cards = [
    { icon: Library, title: t('aboutRepoTitle'), desc: t('aboutRepoDesc'), cta: t('aboutRepoCTA'), href: REPOSITORY_COLLECTION_URL },
    { icon: GraduationCap, title: t('aboutProgramTitle'), desc: t('aboutProgramDesc'), cta: t('aboutProgramCTA'), href: 'https://www.postgradofen.uchile.cl/magister-en-analitica-de-negocios' },
    { icon: Mail, title: t('aboutContactTitle'), desc: t('aboutContactDesc'), cta: 'daviddiazsolis.com', href: 'https://daviddiazsolis.com' },
  ]
  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-16 border-t border-line">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl sm:text-4xl font-bold text-fg mb-8">{t('aboutTitle')}</h2>
        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3 space-y-4 text-fg-2 leading-relaxed">
            <p>{t('aboutP1')}</p><p>{t('aboutP2')}</p><p>{t('aboutP3')}</p>
          </div>
          <div className="lg:col-span-2 grid gap-4">
            {cards.map(c => (
              <a key={c.title} href={c.href} target="_blank" rel="noopener noreferrer"
                className="group rounded-2xl border border-line bg-surface p-5 hover:border-accent/50 hover:-translate-y-0.5 transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-accent-soft text-accent flex items-center justify-center"><c.icon className="w-4 h-4" /></div>
                  <h3 className="font-semibold text-fg">{c.title}</h3>
                </div>
                <p className="text-sm text-muted leading-relaxed mb-3">{c.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent">{c.cta}<ExternalLink className="w-3.5 h-3.5" /></span>
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
