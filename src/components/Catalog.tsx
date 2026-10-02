// SPDX-License-Identifier: Apache-2.0
import { useMemo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Search, X, SlidersHorizontal, ChevronDown } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { THESES, ALL_YEARS, ALL_COHORTS, ALL_ADVISORS, ALL_DOMAINS, ALL_TASKS, ALL_TECHNIQUES, advisorName, type Thesis, type ImpactLevel } from '../data'
import { domainLabel, taskLabel } from '../i18n'
import ThesisCard from './ThesisCard'
import ThesisDetail from './ThesisDetail'

type Sort = 'newest' | 'oldest' | 'title'
type DataFilter = 'any' | 'public' | 'private'

interface Filters {
  q: string
  years: number[]
  cohorts: number[]
  advisors: string[]
  domains: string[]
  tasks: string[]
  techniques: string[]
  impact: ImpactLevel[]
  data: DataFilter
}
const EMPTY: Filters = { q: '', years: [], cohorts: [], advisors: [], domains: [], tasks: [], techniques: [], impact: [], data: 'any' }

const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

function matches(t: Thesis, f: Filters, lang: 'es' | 'en'): boolean {
  if (f.years.length && !f.years.includes(t.defenseYear)) return false
  if (f.cohorts.length && !f.cohorts.includes(t.cohort)) return false
  if (f.advisors.length && !f.advisors.includes(t.advisor) && !(t.coAdvisor && f.advisors.includes(t.coAdvisor))) return false
  if (f.domains.length && !t.domain.some(d => f.domains.includes(d))) return false
  if (f.tasks.length && !t.taskTypes.some(d => f.tasks.includes(d))) return false
  if (f.techniques.length && !t.techniques.some(d => f.techniques.includes(d))) return false
  if (f.impact.length && !f.impact.includes(t.socialImpact.level)) return false
  if (f.data === 'public' && !t.datasets.some(d => d.public)) return false
  if (f.data === 'private' && !t.datasets.some(d => !d.public)) return false
  if (f.q.trim()) {
    const q = norm(f.q)
    const hay = norm([
      t.title.es, t.title.en, t.student, advisorName(t.advisor), t.coAdvisor ? advisorName(t.coAdvisor) : '',
      t.abstract[lang], ...t.keywords.es, ...t.keywords.en, ...t.techniques, ...t.tools, ...t.domain, ...t.taskTypes,
      ...t.datasets.flatMap(d => [d.nameEs, d.nameEn, d.source || '']), t.organization || '',
    ].join(' '))
    if (!q.split(/\s+/).every(w => hay.includes(w))) return false
  }
  return true
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick}
      className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
        active ? 'bg-accent text-accent-fg border-accent' : 'bg-surface text-fg-2 border-line hover:border-line-2 hover:text-fg'}`}>
      {children}
    </button>
  )
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-2">{label}</div>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  )
}

const toggle = <T,>(xs: T[], x: T) => xs.includes(x) ? xs.filter(y => y !== x) : [...xs, x]

export default function Catalog() {
  const { t, language } = useLanguage()
  const [f, setF] = useState<Filters>(EMPTY)
  const [sort, setSort] = useState<Sort>('newest')
  const [showTech, setShowTech] = useState(false)
  const [open, setOpen] = useState<Thesis | null>(null)
  const [mobileFilters, setMobileFilters] = useState(false)

  // Deep link: #tesis=<id>
  useEffect(() => {
    const read = () => {
      const m = window.location.hash.match(/tesis=([\w-]+)/)
      if (m) { const th = THESES.find(x => x.id === m[1]); if (th) setOpen(th) }
    }
    read()
    window.addEventListener('hashchange', read)
    return () => window.removeEventListener('hashchange', read)
  }, [])
  const openThesis = (th: Thesis | null) => {
    setOpen(th)
    if (th) history.replaceState(null, '', `#tesis=${th.id}`)
    else history.replaceState(null, '', window.location.pathname + '#catalog')
  }

  const list = useMemo(() => {
    const xs = THESES.filter(x => matches(x, f, language))
    if (sort === 'oldest') xs.sort((a, b) => a.defenseDate.localeCompare(b.defenseDate))
    else if (sort === 'title') xs.sort((a, b) => a.title[language].localeCompare(b.title[language]))
    return xs
  }, [f, sort, language])

  const active = f.years.length + f.cohorts.length + f.advisors.length + f.domains.length + f.tasks.length + f.techniques.length + f.impact.length + (f.data !== 'any' ? 1 : 0) + (f.q ? 1 : 0)
  const techShown = showTech ? ALL_TECHNIQUES : ALL_TECHNIQUES.filter(x => f.techniques.includes(x) || THESES.filter(th => th.techniques.includes(x)).length >= 2)

  const panel = (
    <div className="space-y-5">
      <Group label={t('fYear')}>{ALL_YEARS.map(y => <Chip key={y} active={f.years.includes(y)} onClick={() => setF({ ...f, years: toggle(f.years, y) })}>{y}</Chip>)}</Group>
      <Group label={t('fCohort')}>{ALL_COHORTS.map(y => <Chip key={y} active={f.cohorts.includes(y)} onClick={() => setF({ ...f, cohorts: toggle(f.cohorts, y) })}>{y}</Chip>)}</Group>
      <Group label={t('fAdvisor')}>{ALL_ADVISORS.map(a => <Chip key={a} active={f.advisors.includes(a)} onClick={() => setF({ ...f, advisors: toggle(f.advisors, a) })}>{advisorName(a)}</Chip>)}</Group>
      <Group label={t('fImpact')}>
        {(['direct', 'indirect', 'none'] as ImpactLevel[]).map(l => (
          <Chip key={l} active={f.impact.includes(l)} onClick={() => setF({ ...f, impact: toggle(f.impact, l) })}>
            {t(l === 'direct' ? 'impactDirect' : l === 'indirect' ? 'impactIndirect' : 'impactNone')}
          </Chip>))}
      </Group>
      <Group label={t('fData')}>
        {(['any', 'public', 'private'] as DataFilter[]).map(d => (
          <Chip key={d} active={f.data === d} onClick={() => setF({ ...f, data: d })}>{t(d === 'any' ? 'dataAny' : d === 'public' ? 'dataPublic' : 'dataPrivate')}</Chip>))}
      </Group>
      <Group label={t('fDomain')}>{ALL_DOMAINS.map(d => <Chip key={d} active={f.domains.includes(d)} onClick={() => setF({ ...f, domains: toggle(f.domains, d) })}>{domainLabel(d, language)}</Chip>)}</Group>
      <Group label={t('fTask')}>{ALL_TASKS.map(d => <Chip key={d} active={f.tasks.includes(d)} onClick={() => setF({ ...f, tasks: toggle(f.tasks, d) })}>{taskLabel(d, language)}</Chip>)}</Group>
      <Group label={t('fTechnique')}>
        {techShown.map(d => <Chip key={d} active={f.techniques.includes(d)} onClick={() => setF({ ...f, techniques: toggle(f.techniques, d) })}>{d}</Chip>)}
        <button onClick={() => setShowTech(s => !s)} className="px-2.5 py-1 rounded-lg text-xs text-accent font-medium inline-flex items-center gap-1">
          {showTech ? '−' : `+${ALL_TECHNIQUES.length - techShown.length}`} <ChevronDown className={`w-3 h-3 transition-transform ${showTech ? 'rotate-180' : ''}`} />
        </button>
      </Group>
      {active > 0 && (
        <button onClick={() => setF(EMPTY)} className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline">
          <X className="w-3 h-3" /> {t('clearFilters')} ({active})
        </button>
      )}
    </div>
  )

  return (
    <section id="catalog" className="py-20 px-6 max-w-7xl mx-auto scroll-mt-16">
      <div className="flex flex-col lg:flex-row gap-10">
        <aside className="lg:w-72 shrink-0">
          <div className="lg:sticky lg:top-24">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-fg inline-flex items-center gap-2"><SlidersHorizontal className="w-4 h-4 text-accent" />{t('filtersTitle')}</h2>
              <button className="lg:hidden text-sm text-accent font-medium" onClick={() => setMobileFilters(m => !m)}>{mobileFilters ? t('close') : `${t('filtersTitle')} (${active})`}</button>
            </div>
            <div className={`${mobileFilters ? 'block' : 'hidden'} lg:block rounded-2xl border border-line bg-surface p-5 max-h-[70vh] overflow-y-auto`}>{panel}</div>
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input value={f.q} onChange={e => setF({ ...f, q: e.target.value })} placeholder={t('searchPlaceholder')}
                className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-line bg-surface text-fg placeholder:text-muted-2 focus:outline-none focus:border-accent text-sm" />
              {f.q && <button onClick={() => setF({ ...f, q: '' })} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-fg"><X className="w-4 h-4" /></button>}
            </div>
            <select value={sort} onChange={e => setSort(e.target.value as Sort)}
              className="px-3 py-2.5 rounded-xl border border-line bg-surface text-fg text-sm focus:outline-none focus:border-accent">
              <option value="newest">{t('sortNewest')}</option>
              <option value="oldest">{t('sortOldest')}</option>
              <option value="title">{t('sortTitle')}</option>
            </select>
          </div>
          <div className="text-sm text-muted mb-4 font-mono">{list.length} {list.length === 1 ? t('result') : t('results')}</div>

          {list.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-line-2 p-12 text-center text-muted">{t('noResults')}</div>
          ) : (
            <motion.div layout className="grid md:grid-cols-2 gap-4">
              <AnimatePresence>
                {list.map(th => (
                  <motion.div key={th.id} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.25 }}>
                    <ThesisCard thesis={th} onOpen={() => openThesis(th)} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      <AnimatePresence>{open && <ThesisDetail thesis={open} onClose={() => openThesis(null)} />}</AnimatePresence>
    </section>
  )
}
