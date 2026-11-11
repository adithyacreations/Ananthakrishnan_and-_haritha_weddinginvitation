import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { createReadStream, existsSync, statSync, cpSync } from 'node:fs'
import path from 'node:path'

// Serve the original root folders at stable public URLs during development;
// copy just those folders into dist at build time for static hosting.
function weddingAssets(): Plugin {
  const roots = ['images', 'audios']
  return {
    name: 'wedding-root-assets',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = decodeURIComponent((req.url ?? '').split('?')[0])
        const folder = roots.find((name) => pathname.startsWith(`/${name}/`))
        if (!folder) return next()
        const root = path.resolve(process.cwd(), folder)
        const file = path.resolve(process.cwd(), pathname.slice(1))
        if (!file.startsWith(root + path.sep) || !existsSync(file) || !statSync(file).isFile()) return next()
        const contentTypes: Record<string, string> = { '.mp3': 'audio/mpeg', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg' }
        res.setHeader('Content-Type', contentTypes[path.extname(file).toLowerCase()] ?? 'application/octet-stream')
        createReadStream(file).pipe(res)
      })
    },
    closeBundle() {
      for (const folder of roots) if (existsSync(folder)) cpSync(folder, path.resolve('dist', folder), { recursive: true })
    },
  }
}

export default defineConfig({ plugins: [react(), tailwindcss(), weddingAssets()] })
