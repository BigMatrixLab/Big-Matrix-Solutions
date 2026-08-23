import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { syncContent } from './scripts/sync-content.js'

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
  plugins: [react(), syncContentPlugin()],
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
