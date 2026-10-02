# Tarea para Claude Code: actualizar man_thesis_catalog en producción

Trabajas en `C:\Users\david\Dropbox\FEN\micro-sitios-educacionales-ML-AI\man_thesis_catalog`, Windows con PowerShell. El repo `daviddiazsolis/man_thesis_catalog` ya existe en GitHub (primer commit 9ade99) y el proyecto `man-thesis-catalog` ya está desplegado en Vercel y conectado al repo: cada push a `main` despliega solo. No vuelvas a ejecutar `git init`, `gh repo create`, `vercel link` ni `vercel --prod`.

Haz los pasos en orden. Si un paso falla, detente, muestra el error y pregunta antes de improvisar. No cambies contenido del sitio; solo publica.

## 0. Antes de empezar
Pide a David que pause la sincronización de Dropbox durante los pasos 2 y 3 (icono de Dropbox, Pausar sincronización) y que la reanude al final.

## 1. Decisión ya tomada sobre los PDF
`public/pdf/` contiene el documento completo de cada tesis con autorización INMEDIATO. Esa autorización es la que la coordinación usa para mandar la tesis a la biblioteca y al repositorio público de la Universidad de Chile, por lo que cubre el documento completo; la regla de publicación en `CLAUDE.md` ya está corregida en ese sentido. Sí se suben.

## 2. Construir y revisar
```
cd "C:\Users\david\Dropbox\FEN\micro-sitios-educacionales-ML-AI\man_thesis_catalog"
npm install
npm run build                    # sin errores de TypeScript
git status --short | Select-String -Pattern "node_modules|dist/|\.vercel|\.env|_txt|_pendientes"    # no debe mostrar nada
Get-ChildItem public\pdf | Measure-Object               # 14 archivos
```
Verifica que ningún PDF de `public/pdf/` corresponda a una tesis con embargo o NO PUBLICAR (lista en `gen/PENDIENTES.md`): los 14 nombres deben coincidir con los 14 JSON de `src/data/theses/`.

## 3. Commit y push
```
git add -A
git commit -m "Logos FEN/FCFM/DII, programa interfacultades, PDF completo por tesis, boton de descarga"
git fsck
git push origin main
```

## 4. Comprobar
```
curl.exe -sI https://man-thesis-catalog.vercel.app | Select-Object -First 1                      # 200
curl.exe -sI https://man-thesis-catalog.vercel.app/pdf/2025-ceroni.pdf | Select-Object -First 1   # 200
```
Si el deploy automático no aparece en Vercel al cabo de unos minutos, ejecuta `vercel --prod` desde la carpeta.

Visualmente: logos FEN, FCFM y DII en el hero y el footer; título "Catálogo de Tesis / Magíster en Analítica de Negocios (MAN)"; en una ficha, botón "Descargar el documento completo (PDF)".

Recuerda a David reanudar la sincronización de Dropbox.
