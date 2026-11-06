# LibroIA web

En Visual Studio Code, abre esta carpeta (`libroiaweb`) y ejecuta:

```sh
npm install
npm run dev
```

Abre http://localhost:4173. Detén el servidor con Ctrl+C. Requiere Node.js 20 o posterior; no requiere Python. También puedes ejecutar esos comandos dentro de `site/`.

## Vercel

Importa el repositorio en Vercel. Si subes la carpeta completa, usa Root Directory `.`. Si el repositorio contiene solo lo que hay dentro de `site/`, usa esa carpeta como raíz. Ambos casos incluyen su propio `vercel.json`.

- Framework Preset: Other
- Build Command: `npm run build`
- Output Directory: `site/dist` desde la raíz, o `dist` desde `site/`

Los fragmentos del APK en `site/dist/assets/apk/` deben incluirse todos. La página los reúne en un único APK. El APK original y el archivo de publicación `.tar.gz` de la raíz no son necesarios para Vercel.
# libroiaweb
