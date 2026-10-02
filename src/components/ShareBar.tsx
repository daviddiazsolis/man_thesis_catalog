// SPDX-License-Identifier: Apache-2.0
import { useState } from 'react'
import { Share2, Link2, Check, Mail } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const SITE = 'https://man-thesis-catalog.vercel.app'

function Icon({ d, label }: { d: string; label: string }) {
  return <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-label={label}><path d={d} /></svg>
}
const LINKEDIN = 'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z'
const X = 'M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.63 7.58H.48l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41z'
const WHATSAPP = 'M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.78h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.89 9.88M20.46 3.49A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.33.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.33 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41'
const FACEBOOK = 'M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.1 24 12.07'

export default function ShareBar({ id, title }: { id: string; title: string }) {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)
  const url = `${SITE}/#tesis=${id}`
  const text = `${title} · ${t('shareTag')}`
  const enc = encodeURIComponent
  const canNative = typeof navigator !== 'undefined' && !!navigator.share

  const copy = async () => {
    try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { /* ignore */ }
  }
  const native = async () => {
    try { await navigator.share({ title, text, url }) } catch { /* cancelado */ }
  }

  const links = [
    { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`, icon: <Icon d={LINKEDIN} label="LinkedIn" /> },
    { label: 'X', href: `https://twitter.com/intent/tweet?text=${enc(text)}&url=${enc(url)}`, icon: <Icon d={X} label="X" /> },
    { label: 'WhatsApp', href: `https://wa.me/?text=${enc(`${text} ${url}`)}`, icon: <Icon d={WHATSAPP} label="WhatsApp" /> },
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`, icon: <Icon d={FACEBOOK} label="Facebook" /> },
    { label: 'Email', href: `mailto:?subject=${enc(title)}&body=${enc(`${text}\n${url}`)}`, icon: <Mail className="w-4 h-4" /> },
  ]
  const btn = 'inline-flex items-center justify-center w-9 h-9 rounded-lg border border-line bg-surface text-muted hover:text-accent hover:border-accent transition-colors'

  return (
    <div>
      <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-2 inline-flex items-center gap-1.5"><Share2 className="w-3.5 h-3.5 text-accent" />{t('shareLabel')}</h4>
      <div className="flex flex-wrap gap-2">
        {links.map(l => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" title={l.label} className={btn}>{l.icon}</a>
        ))}
        <button onClick={copy} title={t('copyLink')} className={btn}>{copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Link2 className="w-4 h-4" />}</button>
        {canNative && (
          <button onClick={native} title={t('shareNative')} className={`${btn} w-auto px-3 gap-1.5 text-xs font-medium`}><Share2 className="w-3.5 h-3.5" />{t('shareNative')}</button>
        )}
      </div>
      <p className="text-[11px] text-muted-2 mt-2">{t('shareHint')}</p>
    </div>
  )
}
