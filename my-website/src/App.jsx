import './App.css'

import uticaLogo from '../../UticaLogo.jpeg'
import Admin from './Admin'
import PublicSchedule from './PublicSchedule'

export default function App({ backendConfigured = true }) {
  const path = window.location.pathname
  const scheduleMatch = path.match(/^\/s\/([^/]+)\/?$/)
  if (scheduleMatch) return backendConfigured ? <PublicSchedule publicId={decodeURIComponent(scheduleMatch[1])} /> : <BackendUnavailable />
  if (path === '/cancel' || path === '/cancel/') return backendConfigured ? <PublicSchedule cancelMode /> : <BackendUnavailable />
  if (path === '/admin' || path === '/admin/') return backendConfigured ? <Admin /> : <BackendUnavailable />

  return (
    <main className="home-page" id="main">
      <a className="skip-link" href="#home-title">Skip to content</a>
      <section className="home-card" aria-labelledby="home-title">
        <img className="home-logo" src={uticaLogo} alt="Utica" />
        <p className="home-eyebrow">WELCOME, USHER TEAM</p>
        <h1 id="home-title">Usher Sign Up</h1>
        <p className="home-description">Use the schedule link from your team leader to choose where you’ll serve. No account needed.</p>
        <div className="home-link-note"><span aria-hidden="true">↗</span><p>Have a schedule link? Open it to see available positions and sign up.</p></div>
        <a className="home-admin-link" href="/admin">Admin sign in</a>
      </section>
    </main>
  )
}

function BackendUnavailable() {
  return <main className="public-shell"><header className="public-top"><a className="brand" href="/"><img className="brand-logo" src={uticaLogo} alt="" />Usher Sign Up</a></header><section className="empty-card"><span className="empty-icon">✳</span><h1>Schedules are getting ready</h1><p>This site is not connected to its Convex deployment yet. Ask your team leader to finish the website setup.</p><a className="primary-button" href="/">Return home</a></section></main>
}
