import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ConvexReactClient } from 'convex/react'
import { ConvexAuthProvider } from '@convex-dev/auth/react'

const convex = import.meta.env.VITE_CONVEX_URL
  ? new ConvexReactClient(import.meta.env.VITE_CONVEX_URL)
  : null

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {convex ? <ConvexAuthProvider client={convex}><App /></ConvexAuthProvider> : <App backendConfigured={false} />}
  </StrictMode>,
)
