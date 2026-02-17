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
})
