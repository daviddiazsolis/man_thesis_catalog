# Tarea para Claude Code: publicar man_thesis_catalog

Trabajas en `C:\Users\david\Dropbox\FEN\micro-sitios-educacionales-ML-AI\man_thesis_catalog`, Windows con PowerShell. Mismo patrón del hub: repo público en GitHub bajo `daviddiazsolis`, proyecto en Vercel (equipo `daviddiazsolis-projects`, framework Vite), URL `https://man-thesis-catalog.vercel.app`.

Haz los pasos en orden. Si un paso falla, detente, muestra el error y pregunta antes de improvisar. No cambies contenido del sitio; solo publica.

## 0. Antes de empezar
Pide a David que pause la sincronización de Dropbox durante los pasos 2 y 3 (icono de Dropbox, Pausar sincronización) y que la reanude al final. Los repos del hub ya se han corrompido antes por Dropbox sincronizando `.git` a mitad de un commit.

## 1. Verificar herramientas
```
node --version        # 18 o superior
git --version
gh auth status        # autenticado como daviddiazsolis; si no: gh auth login
vercel --version      # si no existe: npm i -g vercel, luego vercel login
```

## 2. Instalar, construir y crear el repo local
```
cd "C:\Users\david\Dropbox\FEN\micro-sitios-educacionales-ML-AI\man_thesis_catalog"
npm install
npm run build                    # debe terminar sin errores de TypeScript
git init -b main
git add .
git status --short | Select-String -Pattern "node_modules|dist/|\.vercel|\.env|_txt|_pendientes"    # no debe mostrar nada
git commit -m "MAN thesis catalog: 14 theses with public authorization, EN/ES, FEN colors"
git fsck
```
Sí deben subirse: `src/`, `gen/*.py`, `gen/ESQUEMA.md`, `gen/PENDIENTES.md`, `catalogo_tesis_MAN.xlsx`, `CLAUDE.md`, `README.md`, `public/`. No deben subirse `gen/_txt/` (textos completos de las tesis) ni `gen/_pendientes/`.

## 3. GitHub y Vercel
```
gh repo create daviddiazsolis/man_thesis_catalog --public --source=. --remote=origin --push
vercel link --yes --project man-thesis-catalog
vercel --prod
vercel git connect --yes
```
Si `vercel git connect` falla, conectarlo en el panel (proyecto man-thesis-catalog, Settings, Git, Connect Git Repository).

## 4. Comprobar
```
curl.exe -sI https://man-thesis-catalog.vercel.app | Select-Object -First 1     # 200
```
Visualmente: 14 tarjetas, filtros, ficha con botón "Ver en repositorio" en las tesis de 2025, y el conmutador ES/EN y claro/oscuro.

Recuerda a David reanudar la sincronización de Dropbox.
