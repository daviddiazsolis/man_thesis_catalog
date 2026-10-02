// SPDX-License-Identifier: Apache-2.0
export type Language = 'en' | 'es'
type TMap = Record<string, string>

// Etiquetas de dominio y tipo de tarea: los JSON de tesis usan la clave en español.
export const DOMAIN_EN: Record<string, string> = {
  'finanzas': 'Finance', 'banca': 'Banking', 'retail': 'Retail', 'e-commerce': 'E-commerce', 'marketing': 'Marketing',
  'recursos humanos': 'Human resources', 'salud': 'Healthcare', 'educación': 'Education', 'sector público': 'Public sector',
  'política': 'Politics', 'industria': 'Industry', 'minería': 'Mining', 'agroindustria': 'Agribusiness', 'acuicultura': 'Aquaculture',
  'telecomunicaciones': 'Telecommunications', 'energía': 'Energy', 'transporte': 'Transportation', 'medio ambiente': 'Environment',
  'ciencia y tecnología': 'Science and technology', 'juegos y casinos': 'Gaming and casinos', 'alimentos': 'Food', 'servicios': 'Services',
}
export const TASK_EN: Record<string, string> = {
  'clasificación': 'Classification', 'regresión': 'Regression', 'series de tiempo / forecasting': 'Time series / forecasting',
  'clustering / segmentación': 'Clustering / segmentation', 'detección de anomalías': 'Anomaly detection', 'NLP / LLMs': 'NLP / LLMs',
  'sistemas de recomendación': 'Recommender systems', 'uplift / causal': 'Uplift / causal', 'optimización': 'Optimization',
  'análisis descriptivo e inferencial': 'Descriptive and inferential analysis', 'reducción de dimensionalidad': 'Dimensionality reduction', 'DEA': 'DEA',
}
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
export const domainLabel = (d: string, lang: Language) => lang === 'en' ? (DOMAIN_EN[d] || cap(d)) : cap(d)
export const taskLabel = (d: string, lang: Language) => lang === 'en' ? (TASK_EN[d] || cap(d)) : cap(d)

export const translations: Record<Language, TMap> = {
  es: {
    langEn: 'EN', langEs: 'ES',
    navCatalog: 'Catálogo', navAbout: 'Acerca de', navProgram: 'Programa MAN',

    heroEyebrow: 'Magíster en Analítica de Negocios (MAN) · Programa interfacultades FEN y FCFM, Universidad de Chile',
    heroTitle: 'Catálogo de Tesis',
    heroTitleAccent: 'Magíster en Analítica de Negocios (MAN)',
    heroSubtitle: 'Las actividades formativas equivalentes (AFE) defendidas en el programa: problemas reales, datos reales y machine learning aplicado.',
    heroDesc: 'Explora los temas, los datasets, las técnicas de ML y los profesores guía de cada tesis. Solo se incluyen trabajos cuyos autores autorizaron su publicación.',
    heroCTA: 'Explorar el catálogo',
    heroRepo: 'Repositorio U. de Chile',
    statTheses: 'tesis publicadas',
    statAdvisors: 'profesores guía (FEN y FCFM)',
    statTechniques: 'técnicas de ML',
    statDirect: 'con impacto social directo',

    filtersTitle: 'Filtrar',
    searchPlaceholder: 'Buscar por título, alumno, técnica, dataset, palabra clave...',
    fYear: 'Año de defensa', fCohort: 'Generación', fAdvisor: 'Profesor guía', fDomain: 'Sector', fTask: 'Tipo de problema',
    fTechnique: 'Técnica', fImpact: 'Impacto social', fData: 'Datos',
    impactDirect: 'Directo', impactIndirect: 'Indirecto', impactNone: 'Sin impacto social evidente',
    dataPublic: 'Datos públicos', dataPrivate: 'Datos de empresa', dataAny: 'Todos',
    clearFilters: 'Limpiar filtros',
    results: 'resultados', result: 'resultado', noResults: 'Ninguna tesis coincide con los filtros. Prueba con menos filtros.',
    sortNewest: 'Más recientes', sortOldest: 'Más antiguas', sortTitle: 'Título',
    cohortShort: 'Gen.', defendedOn: 'Defendida el', advisorLabel: 'Profesor guía', coAdvisorLabel: 'Profesor co-guía',
    committeeLabel: 'Comisión', viewDetail: 'Ver ficha', repoLink: 'Ver en repositorio U. de Chile', repoPending: 'Aún no cargada en el repositorio',
    repoSearch: 'Buscar en el repositorio',
    downloadPdf: 'Descargar el documento completo (PDF)', downloadShort: 'PDF',
    shareLabel: 'Compartir', shareTag: 'Tesis del Magíster en Analítica de Negocios, Universidad de Chile', shareNative: 'Más opciones',
    shareHint: 'Instagram no admite compartir enlaces desde la web: copia el enlace y pégalo en tu historia o biografía, o usa "Más opciones" desde el celular.',

    abstractLabel: 'Resumen ejecutivo', highlightsLabel: 'Highlights', datasetsLabel: 'Datasets', techniquesLabel: 'Técnicas y modelos',
    toolsLabel: 'Herramientas', keywordsLabel: 'Palabras clave', impactLabel: 'Impacto social', organizationLabel: 'Organización',
    publicData: 'público', privateData: 'privado', sizeLabel: 'Tamaño', sourceLabel: 'Fuente',
    showOtherLang: 'Ver en inglés', showOtherLangEn: 'Ver en español', close: 'Cerrar', copyLink: 'Copiar enlace', copied: 'Enlace copiado',
    programLabel: 'Programa', studentLabel: 'Autor/a',

    aboutTitle: 'Acerca de este catálogo',
    aboutP1: 'El Magíster en Analítica de Negocios (MAN) es un programa interfacultades de la Universidad de Chile: por la Facultad de Economía y Negocios (FEN) participan sus tres departamentos (Administración, Control de Gestión y Sistemas de Información, y Economía) y por la Facultad de Ciencias Físicas y Matemáticas (FCFM) el Departamento de Ingeniería Industrial (DII). Los profesores guía y las comisiones provienen de ambas facultades. Cada estudiante cierra el programa con una Actividad Formativa Equivalente (AFE): un proyecto aplicado, con datos reales y una contraparte, guiado por un académico del claustro.',
    aboutP2: 'Este catálogo reúne las tesis ya defendidas cuyos autores autorizaron su publicación inmediata. Las tesis con embargo (por confidencialidad de los datos de una empresa u otras razones) se incorporan cuando vence el plazo; las que están en revisión aparecen cuando se completa el proceso.',
    aboutP3: 'Para cada tesis se generó una ficha con resumen ejecutivo y highlights en español e inglés, el detalle de los datasets, las técnicas aplicadas y una clasificación del impacto social (directo cuando el problema es de política pública, salud, educación o equidad; indirecto cuando el beneficio social es derivado; sin impacto evidente cuando la aplicación es puramente comercial). El texto oficial de cada tesis está en el repositorio académico de la Universidad de Chile.',
    aboutRepoTitle: 'Repositorio oficial',
    aboutRepoDesc: 'Colección Tesis Postgrado de la Facultad de Economía y Negocios en el Repositorio Académico de la Universidad de Chile.',
    aboutRepoCTA: 'Abrir colección',
    aboutProgramTitle: 'Magíster en Analítica de Negocios',
    aboutProgramDesc: 'Información oficial del programa, admisión y malla curricular en la Escuela de Postgrado FEN.',
    aboutProgramCTA: 'Ir al programa',
    aboutContactTitle: '¿Eres estudiante del MAN?',
    aboutContactDesc: 'Si tu tesis ya fue defendida y autorizaste su publicación pero no aparece aquí, escribe al co-director del programa.',

    footerCreatedBy: 'Catálogo mantenido por',
    footerRole: 'Co-Director, Magíster en Analítica de Negocios (FEN y FCFM), Universidad de Chile',
    footerNote: 'Los resúmenes y highlights son fichas elaboradas a partir del texto de cada tesis; la versión oficial es la del repositorio.',
  },
  en: {
    langEn: 'EN', langEs: 'ES',
    navCatalog: 'Catalog', navAbout: 'About', navProgram: 'MAN program',

    heroEyebrow: 'Master in Business Analytics (MAN) · Joint FEN and FCFM program, Universidad de Chile',
    heroTitle: 'Thesis Catalog',
    heroTitleAccent: 'Master in Business Analytics (MAN)',
    heroSubtitle: 'The capstone projects (AFE) defended in the program: real problems, real data and applied machine learning.',
    heroDesc: 'Browse the topics, datasets, ML techniques and faculty advisors behind each thesis. Only works whose authors authorized publication are listed.',
    heroCTA: 'Explore the catalog',
    heroRepo: 'U. de Chile repository',
    statTheses: 'published theses',
    statAdvisors: 'advisors (FEN and FCFM)',
    statTechniques: 'ML techniques',
    statDirect: 'with direct social impact',

    filtersTitle: 'Filter',
    searchPlaceholder: 'Search by title, student, technique, dataset, keyword...',
    fYear: 'Defense year', fCohort: 'Cohort', fAdvisor: 'Advisor', fDomain: 'Sector', fTask: 'Problem type',
    fTechnique: 'Technique', fImpact: 'Social impact', fData: 'Data',
    impactDirect: 'Direct', impactIndirect: 'Indirect', impactNone: 'No evident social impact',
    dataPublic: 'Public data', dataPrivate: 'Company data', dataAny: 'All',
    clearFilters: 'Clear filters',
    results: 'results', result: 'result', noResults: 'No thesis matches these filters. Try removing some.',
    sortNewest: 'Newest first', sortOldest: 'Oldest first', sortTitle: 'Title',
    cohortShort: 'Cohort', defendedOn: 'Defended on', advisorLabel: 'Advisor', coAdvisorLabel: 'Co-advisor',
    committeeLabel: 'Committee', viewDetail: 'View details', repoLink: 'View in U. de Chile repository', repoPending: 'Not yet available in the repository',
    repoSearch: 'Search the repository',
    downloadPdf: 'Download the full document (PDF)', downloadShort: 'PDF',
    shareLabel: 'Share', shareTag: 'Master in Business Analytics thesis, Universidad de Chile', shareNative: 'More options',
    shareHint: 'Instagram does not accept link sharing from the web: copy the link and paste it in your story or bio, or use "More options" on mobile.',

    abstractLabel: 'Executive summary', highlightsLabel: 'Highlights', datasetsLabel: 'Datasets', techniquesLabel: 'Techniques and models',
    toolsLabel: 'Tools', keywordsLabel: 'Keywords', impactLabel: 'Social impact', organizationLabel: 'Organization',
    publicData: 'public', privateData: 'private', sizeLabel: 'Size', sourceLabel: 'Source',
    showOtherLang: 'Show in Spanish', showOtherLangEn: 'Show in English', close: 'Close', copyLink: 'Copy link', copied: 'Link copied',
    programLabel: 'Program', studentLabel: 'Author',

    aboutTitle: 'About this catalog',
    aboutP1: 'The Master in Business Analytics (MAN) is a joint program across two schools of Universidad de Chile: the School of Economics and Business (FEN), through its three departments (Management, Management Control and Information Systems, and Economics), and the School of Physical and Mathematical Sciences (FCFM), through the Department of Industrial Engineering (DII). Advisors and committees come from both schools. Every student completes the program with a capstone project (AFE): an applied project with real data and a counterpart organization, supervised by a faculty member.',
    aboutP2: 'This catalog gathers the theses already defended whose authors authorized immediate publication. Embargoed theses (confidential company data or other reasons) are added when the embargo expires; theses still under review appear once the process is complete.',
    aboutP3: 'For each thesis we produced a record with an executive summary and highlights in Spanish and English, the datasets used, the techniques applied and a social impact classification (direct when the problem concerns public policy, health, education or equity; indirect when the social benefit is derived; none when the application is purely commercial). The official text of each thesis lives in the Universidad de Chile academic repository.',
    aboutRepoTitle: 'Official repository',
    aboutRepoDesc: 'Graduate theses collection of the School of Economics and Business in the Universidad de Chile Academic Repository.',
    aboutRepoCTA: 'Open collection',
    aboutProgramTitle: 'Master in Business Analytics',
    aboutProgramDesc: 'Official program information, admissions and curriculum at the FEN Graduate School.',
    aboutProgramCTA: 'Go to the program',
    aboutContactTitle: 'Are you a MAN student?',
    aboutContactDesc: 'If your thesis was defended and you authorized its publication but it is not listed here, write to the program co-director.',

    footerCreatedBy: 'Catalog maintained by',
    footerRole: 'Co-Director, Master in Business Analytics (FEN and FCFM), Universidad de Chile',
    footerNote: 'Summaries and highlights are records prepared from the text of each thesis; the official version is the one in the repository.',
  },
}
