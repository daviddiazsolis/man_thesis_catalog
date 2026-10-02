// SPDX-License-Identifier: Apache-2.0
import { ExternalLink, Calendar, Database, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { domainLabel } from '../i18n'
import type { Thesis } from '../data'
import AdvisorLink from './AdvisorLink'
import ImpactBadge from './ImpactBadge'

export default function ThesisCard({ thesis: th, onOpen }: { thesis: Thesis; onOpen: () => void }) {
  const { t, language } = useLanguage()
  const anyPublic = th.datasets.some(d => d.public)
  return (
    <div onClick={onOpen} role="button" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter') onOpen() }}
      className="group relative h-full rounded-2xl border border-line bg-surface p-5 flex flex-col cursor-pointer transition-all duration-300 hover:border-accent/60 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5">
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{ background: 'radial-gradient(circle at top left, var(--accent-soft) 0%, transparent 60%)' }} />

      <div className="flex items-center justify-between gap-2 mb-3 text-xs font-mono text-muted">
        <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3" />{th.defenseYear} · {t('cohortShort')} {th.cohort}</span>
        <ImpactBadge level={th.socialImpact.level} compact />
      </div>

      <h3 className="font-bold text-fg leading-snug mb-2 group-hover:text-accent transition-colors">{th.title[language]}</h3>
      <p className="text-sm text-muted mb-3">
        {th.student} · <span className="text-fg-2">{t('advisorLabel')}:</span> <AdvisorLink id={th.advisor} />
        {th.coAdvisor && <> · <AdvisorLink id={th.coAdvisor} /></>}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {th.domain.map(d => <span key={d} className="text-[11px] px-2 py-0.5 rounded-md bg-accent-soft text-accent font-medium">{domainLabel(d, language)}</span>)}
        {th.techniques.slice(0, 4).map(x => <span key={x} className="text-[11px] px-2 py-0.5 rounded-md bg-surface-2 text-fg-2 font-mono">{x}</span>)}
        {th.techniques.length > 4 && <span className="text-[11px] px-1.5 py-0.5 text-muted font-mono">+{th.techniques.length - 4}</span>}
      </div>

      <p className="text-xs text-muted leading-relaxed line-clamp-3 mb-4">{th.highlights[language][0]}</p>

      <div className="mt-auto pt-3 border-t border-line flex items-center justify-between text-xs">
        <span className="inline-flex items-center gap-1 text-muted"><Database className="w-3 h-3" />{th.datasets.length} · {anyPublic ? t('publicData') : t('privateData')}</span>
        <span className="inline-flex items-center gap-2">
          {th.repositoryUrl && (
            <a href={th.repositoryUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} title={t('repoLink')}
              className="text-muted hover:text-accent"><ExternalLink className="w-3.5 h-3.5" /></a>
          )}
          <span className="font-semibold text-accent inline-flex items-center gap-0.5">{t('viewDetail')}<ArrowUpRight className="w-3.5 h-3.5" /></span>
        </span>
      </div>
    </div>
  )
}
