// SPDX-License-Identifier: Apache-2.0
// Logos institucionales oficiales (tomados de fen.uchile.cl y dii.uchile.cl) sobre fondo blanco,
// para que funcionen igual en el hero azul, en modo claro y en modo oscuro.
const LOGOS = [
  { src: '/logos/fen.svg', alt: 'Facultad de Economía y Negocios, Universidad de Chile', href: 'https://fen.uchile.cl', h: 'h-9 sm:h-11' },
  { src: '/logos/fcfm.png', alt: 'Facultad de Ciencias Físicas y Matemáticas, Universidad de Chile', href: 'https://ingenieria.uchile.cl', h: 'h-8 sm:h-9' },
  { src: '/logos/dii_dark.svg', alt: 'Departamento de Ingeniería Industrial, Universidad de Chile', href: 'https://www.dii.uchile.cl', h: 'h-8 sm:h-10' },
]

export default function Logos({ className = '' }: { className?: string }) {
  return (
    <div className={`inline-flex flex-wrap items-center gap-x-7 gap-y-3 rounded-2xl bg-white px-5 py-3 shadow-md shadow-black/10 ${className}`}>
      {LOGOS.map(l => (
        <a key={l.src} href={l.href} target="_blank" rel="noopener noreferrer" title={l.alt} className="shrink-0">
          <img src={l.src} alt={l.alt} className={`${l.h} w-auto`} />
        </a>
      ))}
    </div>
  )
}
