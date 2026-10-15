import './App.css'
import Admin from './Admin'
import PublicSchedule from './PublicSchedule'
import HomePage from './HomePage'

export default function App({ backendConfigured = true }) {
  const path = window.location.pathname
  const scheduleMatch = path.match(/^\/s\/([^/]+)\/?$/)
  if (scheduleMatch) return backendConfigured ? <PublicSchedule publicId={decodeURIComponent(scheduleMatch[1])} /> : <BackendUnavailable />
  if (path === '/cancel' || path === '/cancel/') return backendConfigured ? <PublicSchedule cancelMode /> : <BackendUnavailable />
  if (path === '/admin' || path === '/admin/') return backendConfigured ? <Admin /> : <BackendUnavailable />
  return <HomePage backendConfigured={backendConfigured} />
}
function BackendUnavailable() {
  return <main className="public-shell"><section className="empty-card"><h1>Schedules are getting ready</h1><p>Please ask your team leader to finish the website setup.</p><a href="/">Return home</a></section></main>
}
