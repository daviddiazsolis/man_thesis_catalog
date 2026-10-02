// SPDX-License-Identifier: Apache-2.0
import { motion } from 'motion/react'
import { ArrowDown, GraduationCap, Library } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import Logos from './Logos'
import { THESES, ALL_ADVISORS, ALL_TECHNIQUES, REPOSITORY_COLLECTION_URL } from '../data'

const N_DIRECT = THESES.filter(t => t.socialImpact.level === 'direct').length

export default function Hero() {
  const { t } = useLanguage()
  const stats = [
    { val: THESES.length, label: t('statTheses') },
    { val: ALL_ADVISORS.length, label: t('statAdvisors') },
    { val: ALL_TECHNIQUES.length, label: t('statTechniques') },
    { val: N_DIRECT, label: t('statDirect') },
  ]
  return (
    <section className="relative overflow-hidden fen-gradient text-white">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:56px_56px] pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-white/10 blur-3xl pulse-glow pointer-events-none" />
      <div className="absolute -bottom-40 -left-20 w-[420px] h-[420px] rounded-full bg-fen-gold/20 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-20 sm:pt-32 sm:pb-24">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl">
          <Logos className="mb-8" />
          <div className="block" />
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/25 bg-white/10 text-white/90 text-xs font-medium mb-8">
            <GraduationCap className="w-3.5 h-3.5" />
            {t('heroEyebrow')}
          </div>
          <h1 className="font-black tracking-tight mb-6">
            <span className="block text-5xl sm:text-6xl lg:text-7xl leading-[1.02]">{t('heroTitle')}</span>
            <span className="block text-fen-gold text-2xl sm:text-3xl lg:text-4xl leading-tight mt-3">{t('heroTitleAccent')}</span>
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 font-medium mb-4 max-w-3xl leading-relaxed">{t('heroSubtitle')}</p>
          <p className="text-white/70 max-w-2xl leading-relaxed mb-10">{t('heroDesc')}</p>

          <div className="flex flex-wrap gap-3 mb-14">
            <a href="#catalog" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-fen-navy font-semibold hover:bg-fen-gold transition-colors shadow-lg shadow-black/10">
              {t('heroCTA')} <ArrowDown className="w-4 h-4" />
            </a>
            <a href={REPOSITORY_COLLECTION_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/40 text-white hover:bg-white/10 font-medium transition-colors">
              <Library className="w-4 h-4" /> {t('heroRepo')}
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl">
            {stats.map(s => (
              <div key={s.label}>
                <div className="text-4xl font-black font-mono text-fen-gold">{s.val}</div>
                <div className="text-xs text-white/70 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
