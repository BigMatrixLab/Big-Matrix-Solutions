import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import './index.css'
import './assets/css/style.css'
import './assets/css/responsive.css'
import './assets/css/coustom-animation.css'
import './assets/css/markdown.css'
import 'highlight.js/styles/atom-one-dark.css'
/* Design system — loaded last so it owns the cascade.
   bm-core/bm-sections re-skin the remaining template markup;
   bm-ui holds the namespaced components that replaced it. */
import './assets/css/bm-tokens.css'
import './assets/css/bm-core.css'
import './assets/css/bm-sections.css'
import './assets/css/bm-ui.css'
/* Dark-theme reconciliation. Last in the chain: it neutralises the few colours
   in the purchased template and third-party CSS that tokens cannot reach. */
import './assets/css/bm-theme.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
