// SPDX-License-Identifier: Apache-2.0
import { HeartHandshake, Building2, Briefcase } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import type { ImpactLevel } from '../data'

const STYLE: Record<ImpactLevel, string> = {
  direct: 'text-emerald-700 bg-emerald-500/10 border-emerald-500/30 dark:text-emerald-300',
  indirect: 'text-sky-700 bg-sky-500/10 border-sky-500/30 dark:text-sky-300',
  none: 'text-muted bg-surface-2 border-line',
}
const ICON = { direct: HeartHandshake, indirect: Building2, none: Briefcase }

export default function ImpactBadge({ level, compact = false }: { level: ImpactLevel; compact?: boolean }) {
  const { t } = useLanguage()
  const Icon = ICON[level]
  const label = t(level === 'direct' ? 'impactDirect' : level === 'indirect' ? 'impactIndirect' : 'impactNone')
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[11px] font-semibold ${STYLE[level]}`} title={t('impactLabel')}>
      <Icon className="w-3 h-3" />{compact && level === 'none' ? '' : label}
    </span>
  )
}
