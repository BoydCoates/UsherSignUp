import { Component } from 'react'
import { useConvexAuth, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { homeDefaults } from '../../shared/homeContent'
import './HomePage.css'

class HomeDataBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? <HomeView content={homeDefaults} /> : this.props.children }
}
function ConnectedHome() {
  const data = useQuery(api.homepage.get)
  const { isAuthenticated } = useConvexAuth()
  return <HomeView content={data?.content ?? homeDefaults} photoUrl={data?.photoUrl} signedIn={isAuthenticated} />
}
export default function HomePage({ backendConfigured }) {
  return backendConfigured ? <HomeDataBoundary><ConnectedHome /></HomeDataBoundary> : <HomeView content={homeDefaults} />
}
export function HomeView({ content, photoUrl, signedIn = false }) {
  return <div className="utica-home">
    <a className="skip-link" href="#home-main">Skip to content</a>
    <div className="uh-topline"><span>UTICA BAPTIST CHURCH</span><span>Serving our church. Welcoming our community.</span><a href="https://www.uticabaptist.com/" target="_blank" rel="noreferrer">Visit our church website ↗</a></div>
    <header className="uh-nav"><a className="uh-brand" href="/"><img src="/utica-logo.jpeg" alt="Utica Baptist Church logo" /><span>UTICA <small>BAPTIST CHURCH</small></span></a><nav aria-label="Main navigation"><a href="#ministry">Our ministry</a><a href="#usher-of-the-month">Usher of the Month</a><a className="uh-nav-cta" href="#serve">Get involved ↗</a></nav></header>
    {signedIn && <div className="uh-admin-bar">You’re signed in. <a href="/admin?edit=homepage">Edit home page →</a></div>}
    <main id="home-main">
      <section className="uh-hero"><div className="uh-hero-photo" aria-hidden="true" /><div className="uh-hero-shade" /><div className="uh-hero-copy"><p className="uh-kicker">{content.heroEyebrow}</p><h1>{content.heroTitle}</h1><p>{content.heroDescription}</p><div className="uh-hero-actions"><a className="uh-button" href="#serve">Find your place to serve <span>↗</span></a><a className="uh-quiet-link" href="#ministry">Discover the ministry ↓</a></div></div><div className="uh-hero-bottom"><span>THE USHER MINISTRY</span><span>A little kindness. A lasting difference.</span><span aria-hidden="true">↓</span></div></section>
      <section className="uh-purpose" id="ministry"><div><p className="uh-kicker">MORE THAN AN OPEN DOOR</p><h2>{content.ministryTitle}</h2><div className="uh-green-rule" /></div><div><p className="uh-lead">{content.ministryDescription}</p><div className="uh-role-row"><article><span aria-hidden="true">01 /</span><h3>{content.welcomeTitle}</h3><p>{content.welcomeDescription}</p></article><article><span aria-hidden="true">02 /</span><h3>{content.supportTitle}</h3><p>{content.supportDescription}</p></article></div></div></section>
      <section className="uh-spotlight" id="usher-of-the-month"><div className="uh-portrait"><div className="uh-portrait-frame">{photoUrl ? <img src={photoUrl} alt={content.spotlightPhotoAlt || content.spotlightName} loading="lazy" /> : <div className="uh-photo-placeholder"><svg viewBox="0 0 120 120" fill="none" aria-hidden="true"><circle cx="60" cy="40" r="20" stroke="currentColor" strokeWidth="2"/><path d="M20 108V98a40 40 0 0180 0v10" stroke="currentColor" strokeWidth="2"/></svg><span>A face of faithful service</span></div>}</div><span className="uh-photo-corner" aria-hidden="true">✳</span></div><div className="uh-spotlight-copy"><p className="uh-kicker">A HEART WORTH CELEBRATING</p><div className="uh-feature-label"><span>{content.spotlightLabel}</span>{content.spotlightMonth && <span>{content.spotlightMonth}</span>}</div><h2>{content.spotlightName || 'Faithfulness makes a difference.'}</h2><p className="uh-spotlight-story">{content.spotlightDescription}</p><p className="uh-thankyou">{content.thanksTitle}</p><span className="uh-script-line" aria-hidden="true">With grateful hearts, your Utica family</span></div></section>
      <section className="uh-serve" id="serve"><div><p className="uh-kicker">YOU HAVE A PLACE HERE</p><h2>{content.nextTitle}</h2></div><div><p>{content.nextDescription}</p><div className="uh-link-card"><span aria-hidden="true">↗</span><div><h3>Already have a schedule link?</h3><p>Open the link shared by your team leader to sign up for that service. Schedule links are shared directly with the team.</p></div></div></div></section>
      <section className="uh-church-banner"><img src="/utica-logo.jpeg" alt="" loading="lazy" /><div><p className="uh-kicker">{content.bannerEyebrow}</p><h2>{content.bannerTitle}</h2></div><a href="https://www.uticabaptist.com/" target="_blank" rel="noreferrer">Discover Utica Baptist Church ↗</a></section>
    </main>
    <footer className="uh-footer"><div><strong>UTICA BAPTIST CHURCH</strong><p>Usher Ministry · Seneca, South Carolina</p></div><span>4056 Wells Highway · Seneca, SC 29678</span><a href="/admin">Admin sign in ↗</a></footer>
  </div>
}
