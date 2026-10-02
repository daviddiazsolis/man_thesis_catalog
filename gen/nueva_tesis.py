"""Prepara una tesis nueva para el catálogo.

1) Extrae el texto del PDF o DOCX a gen/_pendientes/<slug>.txt (carpeta ignorada por git).
2) Copia el PDF a public/pdf/<año>-<slug>.pdf (si es DOCX lo convierte con LibreOffice: soffice --headless --convert-to pdf).
3) Crea gen/_pendientes/<slug>.prompt.md con las instrucciones para que Claude genere la ficha
   (abstract ES/EN, 5 highlights ES/EN, datasets, técnicas, impacto social) siguiendo gen/ESQUEMA.md.
4) Crea el esqueleto src/data/theses/<año>-<slug>.json con los datos administrativos que se pasan por argumento.

Uso (PowerShell, desde la raíz del repo):
  python gen/nueva_tesis.py "C:\ruta\tesis.pdf" --slug apellido --student "Nombre Apellido" --cohort 2024 `
      --defense 2026-12-15 --advisor weber [--co vergara] [--committee diaz,simon] [--authorization INMEDIATO]

Claves de profesor válidas: las de src/data/advisors.json (agrega ahí a los que falten).
Requiere: pip install python-docx   (y pdftotext de poppler, o pip install pypdf como alternativa)
"""
import argparse, json, os, re, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PEND = os.path.join(ROOT, 'gen', '_pendientes'); os.makedirs(PEND, exist_ok=True)

def extract(path):
    if path.lower().endswith('.docx'):
        import docx
        d = docx.Document(path)
        parts = [p.text for p in d.paragraphs]
        for t in d.tables:
            for r in t.rows: parts.append(' | '.join(c.text.strip() for c in r.cells))
        return '\n'.join(parts)
    try:
        return subprocess.run(['pdftotext', '-layout', path, '-'], capture_output=True, text=True, encoding='utf-8').stdout
    except FileNotFoundError:
        from pypdf import PdfReader
        return '\n'.join((p.extract_text() or '') for p in PdfReader(path).pages)

ap = argparse.ArgumentParser()
ap.add_argument('file'); ap.add_argument('--slug', required=True); ap.add_argument('--student', required=True)
ap.add_argument('--cohort', type=int, required=True); ap.add_argument('--defense', required=True, help='YYYY-MM-DD')
ap.add_argument('--advisor', required=True); ap.add_argument('--co', default=None); ap.add_argument('--committee', default='')
ap.add_argument('--authorization', default='INMEDIATO', help='INMEDIATO | NO PUBLICAR | fecha de fin de embargo YYYY-MM-DD')
ap.add_argument('--program', default='MAN WK')
a = ap.parse_args()

adv = json.load(open(os.path.join(ROOT, 'src/data/advisors.json'), encoding='utf-8'))
for k in [a.advisor, a.co] + [c for c in a.committee.split(',') if c]:
    if k and k not in adv: sys.exit(f'Clave de profesor desconocida: {k}. Agrégala en src/data/advisors.json')

txt = re.sub(r'\n{3,}', '\n\n', extract(a.file))
year = int(a.defense[:4]); tid = f'{year}-{a.slug}'
status = 'public' if a.authorization.upper().startswith('INMEDIATO') else ('pending' if a.authorization == '' else 'embargoed')
open(os.path.join(PEND, f'{a.slug}.txt'), 'w', encoding='utf-8').write(txt)

# PDF público (solo si la tesis es publicable)
pdf_url = None
if status == 'public':
    import shutil
    pdf_dir = os.path.join(ROOT, 'public', 'pdf'); os.makedirs(pdf_dir, exist_ok=True)
    dst = os.path.join(pdf_dir, f'{tid}.pdf')
    if a.file.lower().endswith('.pdf'):
        shutil.copyfile(a.file, dst)
    else:
        r = subprocess.run(['soffice', '--headless', '--convert-to', 'pdf', '--outdir', PEND, a.file], capture_output=True, text=True)
        conv = os.path.join(PEND, os.path.splitext(os.path.basename(a.file))[0] + '.pdf')
        if os.path.exists(conv): shutil.move(conv, dst)
        else: print('AVISO: no se pudo convertir a PDF con LibreOffice; copia el PDF a mano en', dst)
    if os.path.exists(dst): pdf_url = f'/pdf/{tid}.pdf'

skeleton = {
  'id': tid, 'status': status, 'authorization': a.authorization, 'student': a.student, 'cohort': a.cohort,
  'program': a.program, 'defenseDate': a.defense, 'defenseYear': year, 'advisor': a.advisor, 'coAdvisor': a.co,
  'committee': [c for c in a.committee.split(',') if c],
  'title': {'es': '', 'en': ''}, 'abstract': {'es': '', 'en': ''}, 'highlights': {'es': [], 'en': []},
  'keywords': {'es': [], 'en': []}, 'domain': [], 'taskTypes': [], 'techniques': [], 'tools': [], 'datasets': [],
  'organization': None, 'socialImpact': {'level': 'none', 'es': '', 'en': ''}, 'repositoryUrl': None, 'pdfUrl': pdf_url, 'notes': None,
}
out = os.path.join(ROOT, 'src/data/theses', f'{tid}.json')
if os.path.exists(out): sys.exit(f'Ya existe {out}; bórralo primero si quieres regenerarlo.')
json.dump(skeleton, open(out, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)

prompt = f"""Lee COMPLETO el archivo gen/_pendientes/{a.slug}.txt (texto extraído de una tesis del Magíster en Analítica de Negocios, FEN U. de Chile).
Luego lee gen/ESQUEMA.md y completa el archivo src/data/theses/{tid}.json: rellena title, abstract, highlights, keywords, domain,
taskTypes, techniques, tools, datasets, organization y socialImpact siguiendo exactamente el esquema. No cambies los campos
administrativos ya escritos. Nada de em dashes. Verifica el JSON con python -m json.tool.
Después busca el handle en https://repositorio.uchile.cl (OpenSearch: https://repositorio.uchile.cl/open-search/discover?query=<apellido>&scope=2250/100039&format=atom)
y, si existe, escribe la URL en repositoryUrl. Finalmente ejecuta: python gen/exportar_excel.py
"""
open(os.path.join(PEND, f'{a.slug}.prompt.md'), 'w', encoding='utf-8').write(prompt)
print(f'Texto: gen/_pendientes/{a.slug}.txt ({len(txt.split())} palabras)')
print(f'Esqueleto: src/data/theses/{tid}.json  (status={status})')
print(f'Siguiente paso: pega en Claude Code el contenido de gen/_pendientes/{a.slug}.prompt.md')
