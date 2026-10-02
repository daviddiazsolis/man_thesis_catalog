// SPDX-License-Identifier: Apache-2.0
import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { X, ExternalLink, Link2, Check, Calendar, Users, Database, Cpu, Wrench, Tag, Building2, Languages, Search, FileDown } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { domainLabel, taskLabel } from '../i18n'
import { repositorySearchUrl, type Thesis, type Lang } from '../data'
import AdvisorLink from './AdvisorLink'
import ImpactBadge from './ImpactBadge'

function Section({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-2 inline-flex items-center gap-1.5"><Icon className="w-3.5 h-3.5 text-accent" />{title}</h4>
      {children}
    </div>
  )
}

export default function ThesisDetail({ thesis: th, onClose }: { thesis: Thesis; onClose: () => void }) {
  const { t, language } = useLanguage()
  const [textLang, setTextLang] = useState<Lang>(language)
  const [copied, setCopied] = useState(false)
  useEffect(() => setTextLang(language), [language])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])

  const copy = async () => {
    try { await navigator.clipboard.writeText(`${location.origin}${location.pathname}#tesis=${th.id}`); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { /* ignore */ }
  }
  const date = new Date(th.defenseDate + 'T12:00:00').toLocaleDateString(language === 'es' ? 'es-CL' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' })
  const other = textLang === 'es' ? 'en' : 'es'

  return (
    <motion.div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-6"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
      <div className="absolute inset-0 bg-fen-navy/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div role="dialog" aria-modal="true"
        initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ duration: 0.25 }}
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-line bg-bg shadow-2xl">
        <div className="fen-gradient text-white px-6 sm:px-8 pt-6 pb-6">
          <div className="flex items-start justify-between gap-4">
            <div className="text-xs font-mono text-white/75 inline-flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3" />{t('defendedOn')} {date}</span>
              <span>·</span><span>{t('cohortShort')} {th.cohort}</span><span>·</span><span>{th.program}</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={copy} title={t('copyLink')} className="w-8 h-8 rounded-lg hover:bg-white/15 flex items-center justify-center">{copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}</button>
              <button onClick={onClose} title={t('close')} className="w-8 h-8 rounded-lg hover:bg-white/15 flex items-center justify-center"><X className="w-4 h-4" /></button>
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold leading-snug mt-3">{th.title[textLang]}</h2>
          <p className="text-sm text-white/80 mt-2">{t('studentLabel')}: <span className="text-white font-medium">{th.student}</span></p>
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <ImpactBadge level={th.socialImpact.level} />
            {th.domain.map(d => <span key={d} className="text-[11px] px-2 py-0.5 rounded-md bg-white/15 text-white font-medium">{domainLabel(d, language)}</span>)}
            {th.taskTypes.map(d => <span key={d} className="text-[11px] px-2 py-0.5 rounded-md border border-white/30 text-white/90">{taskLabel(d, language)}</span>)}
          </div>
        </div>

        <div className="px-6 sm:px-8 py-6 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-7">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-fg">{t('abstractLabel')}</h3>
              <button onClick={() => setTextLang(other)} className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline">
                <Languages className="w-3.5 h-3.5" />{textLang === 'es' ? t('showOtherLang') : t('showOtherLangEn')}
              </button>
            </div>
            <p className="text-sm text-fg-2 leading-relaxed -mt-4">{th.abstract[textLang]}</p>

            <div>
              <h3 className="font-bold text-fg mb-3">{t('highlightsLabel')}</h3>
              <ol className="space-y-2">
                {th.highlights[textLang].map((h, i) => (
                  <li key={i} className="flex gap-3 text-sm text-fg-2 leading-relaxed">
                    <span className="shrink-0 w-6 h-6 rounded-lg bg-accent-soft text-accent text-xs font-bold font-mono flex items-center justify-center">{i + 1}</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ol>
            </div>

            <Section icon={Database} title={t('datasetsLabel')}>
              <div className="grid sm:grid-cols-2 gap-2">
                {th.datasets.map((d, i) => (
                  <div key={i} className="rounded-xl border border-line bg-surface p-3 text-sm">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-medium text-fg">{textLang === 'es' ? d.nameEs : d.nameEn}</span>
                      <span className={`shrink-0 text-[10px] px-1.5 py-0.5 rounded font-semibold ${d.public ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300' : 'bg-amber-500/10 text-amber-700 dark:text-amber-300'}`}>{d.public ? t('publicData') : t('privateData')}</span>
                    </div>
                    {d.source && <div className="text-xs text-muted mt-1">{t('sourceLabel')}: {d.source}</div>}
                    {d.sizeNote && <div className="text-xs text-muted">{t('sizeLabel')}: {d.sizeNote}</div>}
                    {d.url && <a href={d.url} target="_blank" rel="noopener noreferrer" className="text-xs text-accent inline-flex items-center gap-1 mt-1 hover:underline break-all">{d.url.replace(/^https?:\/\//, '').slice(0, 48)}<ExternalLink className="w-3 h-3" /></a>}
                  </div>
                ))}
              </div>
            </Section>

            <Section icon={Building2} title={t('impactLabel')}>
              <p className="text-sm text-fg-2 leading-relaxed">{th.socialImpact[textLang]}</p>
            </Section>
          </div>

          <aside className="space-y-6">
            <Section icon={Users} title={t('advisorLabel')}>
              <div className="text-sm"><AdvisorLink id={th.advisor} full /></div>
              {th.coAdvisor && <div className="text-xs text-muted mt-2">{t('coAdvisorLabel')}: <AdvisorLink id={th.coAdvisor} full /></div>}
              {th.committee.length > 0 && (
                <div className="text-xs text-muted mt-2">{t('committeeLabel')}: {th.committee.map((c, i) => <span key={c}>{i > 0 && ', '}<AdvisorLink id={c} /></span>)}</div>
              )}
            </Section>
            {th.organization && (
              <Section icon={Building2} title={t('organizationLabel')}><p className="text-sm text-fg-2">{th.organization}</p></Section>
            )}
            <Section icon={Cpu} title={t('techniquesLabel')}>
              <div className="flex flex-wrap gap-1.5">{th.techniques.map(x => <span key={x} className="text-[11px] px-2 py-0.5 rounded-md bg-surface-2 text-fg-2 font-mono">{x}</span>)}</div>
            </Section>
            {th.tools.length > 0 && (
              <Section icon={Wrench} title={t('toolsLabel')}>
                <div className="flex flex-wrap gap-1.5">{th.tools.map(x => <span key={x} className="text-[11px] px-2 py-0.5 rounded-md border border-line text-muted font-mono">{x}</span>)}</div>
              </Section>
            )}
            <Section icon={Tag} title={t('keywordsLabel')}>
              <p className="text-xs text-muted leading-relaxed">{th.keywords[textLang].join(' · ')}</p>
            </Section>
            <div className="pt-2 border-t border-line space-y-2">
              {th.pdfUrl && (
                <a href={th.pdfUrl} target="_blank" rel="noopener noreferrer" download
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-accent text-accent-fg text-sm font-semibold hover:opacity-90">
                  <FileDown className="w-4 h-4" />{t('downloadPdf')}
                </a>
              )}
              {th.repositoryUrl ? (
                <a href={th.repositoryUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-accent text-accent text-sm font-semibold hover:bg-accent-soft">
                  <ExternalLink className="w-4 h-4" />{t('repoLink')}
                </a>
              ) : (
                <>
                  <div className="text-xs text-muted text-center">{t('repoPending')}</div>
                  <a href={repositorySearchUrl(th.student.split(' ').slice(-2).join(' '))} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-line text-fg-2 text-sm font-medium hover:border-accent">
                    <Search className="w-4 h-4" />{t('repoSearch')}
                  </a>
                </>
              )}
            </div>
          </aside>
        </div>
      </motion.div>
    </motion.div>
  )
}
