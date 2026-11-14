import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { syncContent } from './scripts/sync-content.js'
import { devApiPlugin } from './scripts/dev-api-plugin.js'

/* `*.md?frontmatter` imports only the front-matter block of a markdown file.
   src/data/content.js lists every post, product and service from their front
   matter; importing the whole files put about 1.2 MB of article text into the
   main JavaScript bundle. The article body is fetched from /content when a
   page opens, as before. */
const frontmatterOnly = () => ({
  name: 'md-frontmatter-only',
  enforce: 'pre',
  load(id) {
    if (!id.endsWith('.md?frontmatter')) return null
    const raw = readFileSync(id.slice(0, -'?frontmatter'.length), 'utf-8').replace(/^\uFEFF/, '')
    const block = raw.match(/^---\s*[\r\n]+[\s\S]*?[\r\n]+---/)
    return `export default ${JSON.stringify(block ? block[0] : '')};`
  },
})

// Simple Vite plugin to sync content
const syncContentPlugin = () => ({
  name: 'sync-content',
  buildStart() {
    syncContent();
  },
  handleHotUpdate({ file }) {
    if (file.includes('src/content') && file.endsWith('.md')) {
      syncContent();
    }
  }
})

// https://vite.dev/config/
export default defineConfig({
  /* devApiPlugin serves /functions locally; on Cloudflare Pages those files are
     run by the platform, so the plugin is dev-only and adds nothing to the
     production bundle. */
  plugins: [frontmatterOnly(), react(), syncContentPlugin(), devApiPlugin()],
  server: {
    /* Not Vite's default 5173: on this Windows host, Hyper-V/WSL reserves the
       5141-5240 range, so binding 5173 fails with EACCES even though nothing is
       listening on it. 3000 sits outside every reserved range.
       Check the current reservations with:
         netsh interface ipv4 show excludedportrange protocol=tcp */
    port: 3000,
    /* Fall forward to the next free port instead of dying if 3000 is taken. */
    strictPort: false,
  },
  preview: {
    port: 3001,
    strictPort: false,
  },
})
