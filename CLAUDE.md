# CLAUDE.md: Catálogo de Tesis MAN (man_thesis_catalog)

Sitio estático que cataloga las tesis (AFE) del Magíster en Analítica de Negocios, FEN y FCFM, Universidad de Chile. Sitio institucional del programa (interfacultades: FEN con sus tres departamentos, FCFM con el DII; la paleta es la de FEN por decisión de David): no se enlaza desde el ML & AI Hub ni desde daviddiazsolis.com. Mismo patrón técnico que los micrositios de `micro-sitios-educacionales-ML-AI`: Vite + React 19 + TypeScript + Tailwind v4 + lucide-react + motion, EN/ES y claro/oscuro, repo público en GitHub (`daviddiazsolis/man_thesis_catalog`), deploy en Vercel (`man-thesis-catalog.vercel.app`).

Colores FEN (tomados de fen.uchile.cl): azul `#0034d9`, azul profundo `#0d0b70`, celeste `#3b78db`, dorado `#e2b647`. Tipografía Inter. Todo está en `src/index.css` como variables CSS mapeadas a tokens de Tailwind (`bg-bg`, `text-fg`, `border-line`, `text-accent`, `bg-surface`, etc.). El modo oscuro se activa con la clase `dark` en `<html>`.

## Logos

`public/logos/` contiene los logos oficiales descargados de fen.uchile.cl (`fen.svg`), dii.uchile.cl (`dii_dark.svg`, versión con relleno azul profundo del SVG original blanco) y el de la FCFM que usa el DII (`fcfm.png`, baja resolución: reemplazar por un SVG oficial si se consigue). Se muestran en el hero y en el footer sobre una tarjeta blanca (`src/components/Logos.tsx`).

## Estructura

```
src/data/theses/<año>-<slug>.json   una ficha por tesis (se cargan solas con import.meta.glob)
src/data/advisors.json              profesores: nombre, afiliación ES/EN, URL de su página
src/data/index.ts                   tipos, carga, filtros derivados (años, generaciones, técnicas...)
src/i18n.ts                         textos de la interfaz y traducción de sector / tipo de problema
src/components/Catalog.tsx          buscador + filtros + grilla; deep link #tesis=<id>
src/components/ThesisDetail.tsx     ficha completa (abstract y highlights conmutables ES/EN)
gen/nueva_tesis.py                  alta de una tesis nueva (extrae texto + esqueleto JSON + prompt)
gen/exportar_excel.py               regenera catalogo_tesis_MAN.xlsx (respaldo de la metadata)
gen/ESQUEMA.md                      reglas para generar la ficha con Claude
gen/PENDIENTES.md                   tesis con embargo, no publicables o sin autorización aún
```

## PDFs

El documento completo de cada tesis publicable va en `public/pdf/<id>.pdf` (los Word se convierten a PDF con LibreOffice para uniformar) y la ficha lo referencia en `pdfUrl`. Se sirven desde el mismo deploy de Vercel (`https://man-thesis-catalog.vercel.app/pdf/<id>.pdf`), así el link es estable y no depende de Drive ni Dropbox. Son unos 3 MB por tesis; si el repo pasa de 500 MB, mover los PDF a GitHub Releases o a un bucket y cambiar `pdfUrl`.

## Regla de publicación

Solo se publican las tesis cuyo autor autorizó la publicación inmediata (columna "Confidencial" = INMEDIATO en el Excel de autorizaciones de la coordinación, carpeta `Dirección Master in Business Analytics - FEN/primera versión 2023/TESIS`). El campo `status` del JSON controla la visibilidad: `public` se muestra; `embargoed` y `pending` se ignoran en el build (pueden existir en el repo pero no aparecen en el sitio). El PDF completo de una tesis se sube a `public/pdf/` solo cuando su autorización es INMEDIATO (o el embargo ya venció): esa autorización es la misma que la coordinación usa para enviar la tesis a la biblioteca y al repositorio público de la universidad, así que cubre el documento completo. Nunca subir el PDF, el DOCX ni el texto extraído de una tesis con embargo o NO PUBLICAR (`gen/_txt/` y `gen/_pendientes/` están en .gitignore justamente por eso). Ojo: lo que entra al historial de git de un repo público queda ahí aunque se borre después; ante una revocación habría que reescribir el historial.

## Agregar una tesis nueva

```powershell
cd "C:\Users\david\Dropbox\FEN\micro-sitios-educacionales-ML-AI\man_thesis_catalog"
python gen\nueva_tesis.py "C:\ruta\a\la\tesis.pdf" --slug apellido --student "Nombre Apellido Apellido" --cohort 2024 --defense 2026-12-15 --advisor weber --committee diaz,simon
```

Luego pegar en Claude Code el contenido de `gen\_pendientes\<slug>.prompt.md`: Claude lee el texto, completa el JSON siguiendo `gen/ESQUEMA.md`, busca el handle en repositorio.uchile.cl y regenera el Excel. Revisar la ficha, `npm run build`, commit y push (Vercel despliega solo).

Si el profesor guía no existe en `advisors.json`, agregarlo con una clave corta (apellido en minúsculas) y la URL de su página institucional (fen.uchile.cl/academicos/... o dii.uchile.cl/quien/...).

## Links al repositorio U. de Chile

Colección "Tesis Postgrado" de la FEN: https://repositorio.uchile.cl/handle/2250/100039. Las tesis suelen aparecer meses después de la defensa; cuando `repositoryUrl` es null el sitio muestra un botón de búsqueda por apellido. Para buscar sin el challenge anti-bot usar OpenSearch: `https://repositorio.uchile.cl/open-search/discover?query=<texto>&scope=2250/100039&format=atom`.

## Comandos

```powershell
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc -b && vite build
python gen\exportar_excel.py
```
