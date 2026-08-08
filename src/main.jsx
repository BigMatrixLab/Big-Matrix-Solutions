import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)
