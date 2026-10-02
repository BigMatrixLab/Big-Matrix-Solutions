import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
  {
    /* Build and dev tooling runs in Node, not the browser, so it needs Node
       globals (process, Buffer, __dirname). The block above supplies browser
       globals, which is right for src/ and for functions/ — Cloudflare Workers
       expose fetch, Request/Response, crypto and Intl, not Node's. */
    files: ['scripts/**/*.js', 'vite.config.js', 'eslint.config.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
])
