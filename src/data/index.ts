// SPDX-License-Identifier: Apache-2.0
// Carga automática de todas las tesis: basta con agregar un archivo JSON en src/data/theses/
// (ver gen/README y CLAUDE.md para el flujo de alta de una tesis nueva).
import advisorsRaw from './advisors.json'

export type Lang = 'es' | 'en'
export type Bilingual = { es: string; en: string }
export type BilingualList = { es: string[]; en: string[] }
export type ImpactLevel = 'direct' | 'indirect' | 'none'

export interface Dataset {
  nameEs: string
  nameEn: string
  source: string | null
  public: boolean
  url: string | null
  sizeNote: string | null
}

export interface Thesis {
  id: string
  status: 'public' | 'embargoed' | 'pending'
  authorization: string
  student: string
  cohort: number
  program: string
  defenseDate: string
  defenseYear: number
  advisor: string
  coAdvisor: string | null
  committee: string[]
  title: Bilingual
  abstract: Bilingual
  highlights: BilingualList
  keywords: BilingualList
  domain: string[]
  taskTypes: string[]
  techniques: string[]
  tools: string[]
  datasets: Dataset[]
  organization: string | null
  socialImpact: { level: ImpactLevel; es: string; en: string }
  repositoryUrl: string | null
  pdfUrl?: string | null
  notes?: string | null
}

export interface Advisor {
  name: string
  affiliationEs: string
  affiliationEn: string
  url: string | null
  urlType: 'institutional' | 'personal' | 'scholar' | 'linkedin' | null
}

export const ADVISORS: Record<string, Advisor> = advisorsRaw as Record<string, Advisor>

const modules = import.meta.glob('./theses/*.json', { eager: true, import: 'default' }) as Record<string, Thesis>

// Solo se publican las tesis con autorización explícita del alumno (status === 'public').
export const THESES: Thesis[] = Object.values(modules)
  .filter(t => t.status === 'public')
  .sort((a, b) => (b.defenseDate.localeCompare(a.defenseDate)) || a.student.localeCompare(b.student))

export const REPOSITORY_COLLECTION_URL = 'https://repositorio.uchile.cl/handle/2250/100039'
export const repositorySearchUrl = (query: string) =>
  `https://repositorio.uchile.cl/handle/2250/100039/discover?query=${encodeURIComponent(query)}`

export const shortName = (full: string) => {
  // "Richard Weber" -> "Richard Weber"; "Jaime Andrés Miranda Pino" -> "Jaime Miranda"
  const p = full.split(' ').filter(Boolean)
  if (p.length <= 2) return full
  if (p.length === 3) return `${p[0]} ${p[1]}`
  return `${p[0]} ${p[p.length - 2]}`
}

export const advisorName = (key: string) => ADVISORS[key] ? shortName(ADVISORS[key].name) : key

const uniqSorted = (xs: string[]) => Array.from(new Set(xs)).sort((a, b) => a.localeCompare(b))
export const ALL_YEARS = Array.from(new Set(THESES.map(t => t.defenseYear))).sort((a, b) => b - a)
export const ALL_COHORTS = Array.from(new Set(THESES.map(t => t.cohort))).sort((a, b) => b - a)
export const ALL_ADVISORS = uniqSorted(THESES.flatMap(t => [t.advisor, ...(t.coAdvisor ? [t.coAdvisor] : [])]))
export const ALL_DOMAINS = uniqSorted(THESES.flatMap(t => t.domain))
export const ALL_TASKS = uniqSorted(THESES.flatMap(t => t.taskTypes))
export const ALL_TECHNIQUES = uniqSorted(THESES.flatMap(t => t.techniques))
