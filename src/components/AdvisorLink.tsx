// SPDX-License-Identifier: Apache-2.0
import { ExternalLink } from 'lucide-react'
import { ADVISORS, shortName } from '../data'
import { useLanguage } from '../context/LanguageContext'

export default function AdvisorLink({ id, full = false, className = '' }: { id: string; full?: boolean; className?: string }) {
  const { language } = useLanguage()
  const a = ADVISORS[id]
  if (!a) return <span className={className}>{id}</span>
  const label = full ? `${a.name}${a.faculty && a.faculty !== 'externo' ? ` (${a.faculty})` : ''}` : shortName(a.name)
  const title = language === 'en' ? a.affiliationEn : a.affiliationEs
  if (!a.url) return <span className={className} title={title}>{label}</span>
  return (
    <a href={a.url} target="_blank" rel="noopener noreferrer" title={title}
      onClick={e => e.stopPropagation()}
      className={`inline-flex items-center gap-1 text-accent hover:underline underline-offset-2 ${className}`}>
      {label}<ExternalLink className="w-3 h-3 opacity-70" />
    </a>
  )
}
