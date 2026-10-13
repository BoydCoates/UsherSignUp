import './App.css'

import Admin from './Admin'
import PublicSchedule from './PublicSchedule'

const steps = [
  ['01', 'Learn about the team', 'Discover how ushers welcome guests and help each service run smoothly.'],
  ['02', 'Find a time to serve', 'Speak with your usher team leader about available services and how to sign up.'],
  ['03', 'Come ready to welcome', 'Confirm when to arrive and where to meet. Your team will help you get started.'],
]

export default function App({ adminConfigured = false, backendConfigured = true }) {
  const path = window.location.pathname
  const scheduleMatch = path.match(/^\/s\/([^/]+)\/?$/)
  if (scheduleMatch) return backendConfigured ? <PublicSchedule publicId={decodeURIComponent(scheduleMatch[1])} /> : <BackendUnavailable />
  if (path === '/cancel' || path === '/cancel/') return backendConfigured ? <PublicSchedule cancelMode /> : <BackendUnavailable />
  if (path === '/admin' || path === '/admin/') return backendConfigured ? <Admin /> : <BackendUnavailable />
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="brand" href="#home"><span aria-hidden="true" className="brand-mark">u.</span>Usher Sign Up</a>
        <nav aria-label="Main navigation"><a href="#about">Our purpose</a><a href="#how-it-works">How it works</a><a className="nav-button" href="#get-started">Get involved ↗</a></nav>
      </header>
      <main id="main">
        <section className="hero wrap" id="home" aria-labelledby="home-title">
          <div>
            <p className="eyebrow">A PLACE TO SERVE. A WELCOME FOR EVERYONE.</p>
            <h1 id="home-title">A warm welcome<br />starts with <em>you.</em></h1>
            <p className="hero-description">Help people feel at home from the moment they arrive. Usher Sign Up is a home for our usher team to learn about serving and get ready to take part.</p>
            <div className="hero-actions"><a className="button" href="#get-started">Learn how to get involved ↗</a><a className="text-link" href="#about">Explore the ministry ↓</a></div>
            <p className="hero-note">New to ushering? There’s a place for you here.</p>
          </div>
          <div className="welcome-art" role="img" aria-label="An open doorway with a welcome mat, symbolizing a welcoming community">
            <span className="art-caption">SMALL ACTS. MEANINGFUL CONNECTIONS.</span>
            <div className="sun" /><div className="doorway"><div className="door-light" /><div className="open-door"><span className="door-knob" /></div></div>
            <div className="floor-line" /><div className="welcome-mat">WELCOME</div>
            <div className="plant"><span /><span /><span /><span /></div>
            <div className="welcome-label"><span aria-hidden="true">✳</span><div>A little kindness.<br /><strong>A lasting difference.</strong></div></div>
          </div>
        </section>
        <section className="purpose wrap" id="about" aria-labelledby="purpose-title">
          <div><p className="eyebrow">MORE THAN A GREETING</p><h2 id="purpose-title">Helping everyone<br />feel they belong.</h2></div>
          <div><p className="section-description">Ushers help create a welcoming, orderly environment so people can settle in and focus on the service. A smile, a helping hand, and a little attention can make all the difference.</p>
            <div className="role-grid"><article><span className="symbol" aria-hidden="true">↗</span><h3>Welcome & guide</h3><p>Greet guests, offer directions, and help people find a seat.</p></article><article><span className="symbol" aria-hidden="true">♡</span><h3>Support & care</h3><p>Stay attentive to people’s needs and help your team keep the service running smoothly.</p></article></div>
          </div>
        </section>
        <section className="how-section wrap" id="how-it-works" aria-labelledby="steps-title">
          <div className="steps-heading"><div><p className="eyebrow">YOUR NEXT STEP</p><h2 id="steps-title">Serving simply starts here.</h2></div><p>A little of your time can mean a lot to someone else.</p></div>
          <div className="steps-grid">{steps.map(([number, title, description]) => <article className="step" key={number}><span className="step-number">{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
        </section>
        <section className="get-started wrap" id="get-started" aria-labelledby="start-title">
          <div><p className="eyebrow">YOU’RE INVITED</p><h2 id="start-title">Bring your willingness.<br />We’ll start from there.</h2><p>You don’t need to have it all figured out. Introduce yourself to the usher team leader at your next service to learn about opportunities, expectations, and how to sign up.</p></div>
          <div className="first-time"><span className="symbol" aria-hidden="true">✳</span><h3>First time serving?</h3><p>Ask about where to meet, when to arrive, and who you’ll serve alongside. Your team leader can help you prepare.</p><a className="text-link" href="#how-it-works">Review the steps ↑</a></div>
        </section>
        <section className="wrap admin-section" id="admin">
          {adminConfigured ? <Admin /> : <div className="admin-panel"><h2>Admin sign-in</h2><p>Admin sign-in will be available once the website is connected to its database.</p></div>}
        </section>
      </main>
      <footer className="site-footer"><a className="brand" href="#home"><span className="brand-mark" aria-hidden="true">u.</span>Usher Sign Up</a><p>Serving together. Welcoming everyone.</p><a href="#admin">Admin sign-in</a><a href="#home">Back to top ↑</a></footer>
    </>
  )
}

function BackendUnavailable() {
  return <main className="public-shell"><header className="public-top"><a className="brand" href="/"><span className="brand-mark">u.</span>Usher Sign Up</a></header><section className="empty-card"><span className="empty-icon">✳</span><h1>Schedules are getting ready</h1><p>This site is not connected to its Convex deployment yet. Ask your team leader to finish the website setup.</p><a className="primary-button" href="/">Return home</a></section></main>
}
