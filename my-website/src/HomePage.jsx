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
  content = { ...homeDefaults, ...content }
  return <div className="utica-home">
    <a className="skip-link" href="#home-main">{content.skipLabel}</a>
    <div className="uh-topline"><span>{content.topChurchName}</span><span>{content.topTagline}</span><a href="https://www.uticabaptist.com/" target="_blank" rel="noreferrer">{content.topWebsiteLabel} ↗</a></div>
    <header className="uh-nav"><a className="uh-brand" href="/"><img src="/utica-logo.jpeg" alt={content.brandLogoAlt} /><span>{content.brandName} <small>{content.brandSubtitle}</small></span></a><nav aria-label={content.navigationLabel}><a href="#ministry">{content.navMinistry}</a><a href="#usher-of-the-month">{content.navSpotlight}</a><a className="uh-nav-cta" href="#serve">{content.navServe} ↗</a></nav></header>
    {signedIn && <div className="uh-admin-bar">{content.adminStatus} <a href="/admin?edit=homepage">{content.adminEditLabel} →</a></div>}
    <main id="home-main">
      <section className="uh-hero"><div className="uh-hero-photo" aria-hidden="true" /><div className="uh-hero-shade" /><div className="uh-hero-copy"><p className="uh-kicker">{content.heroEyebrow}</p><h1>{content.heroTitle}</h1><p>{content.heroDescription}</p><div className="uh-hero-actions"><a className="uh-button" href="#serve">{content.heroPrimaryLabel} <span>↗</span></a><a className="uh-quiet-link" href="#ministry">{content.heroSecondaryLabel} ↓</a></div></div><div className="uh-hero-bottom"><span>{content.heroFooterLabel}</span><span>{content.heroFooterTagline}</span><span aria-hidden="true">↓</span></div></section>
      <section className="uh-purpose" id="ministry"><div><p className="uh-kicker">{content.ministryEyebrow}</p><h2>{content.ministryTitle}</h2><div className="uh-green-rule" /></div><div><p className="uh-lead">{content.ministryDescription}</p><div className="uh-role-row"><article><span aria-hidden="true">{content.welcomeNumber}</span><h3>{content.welcomeTitle}</h3><p>{content.welcomeDescription}</p></article><article><span aria-hidden="true">{content.supportNumber}</span><h3>{content.supportTitle}</h3><p>{content.supportDescription}</p></article></div></div></section>
      <section className="uh-spotlight" id="usher-of-the-month"><div className="uh-portrait"><div className="uh-portrait-frame">{photoUrl ? <img src={photoUrl} alt={content.spotlightPhotoAlt || content.spotlightName} loading="lazy" /> : <div className="uh-photo-placeholder"><svg viewBox="0 0 120 120" fill="none" aria-hidden="true"><circle cx="60" cy="40" r="20" stroke="currentColor" strokeWidth="2"/><path d="M20 108V98a40 40 0 0180 0v10" stroke="currentColor" strokeWidth="2"/></svg><span>{content.spotlightPlaceholder}</span></div>}</div><span className="uh-photo-corner" aria-hidden="true">✳</span></div><div className="uh-spotlight-copy"><p className="uh-kicker">{content.spotlightEyebrow}</p><div className="uh-feature-label"><span>{content.spotlightLabel}</span>{content.spotlightMonth && <span>{content.spotlightMonth}</span>}</div><h2>{content.spotlightName || content.spotlightFallbackTitle}</h2><p className="uh-spotlight-story">{content.spotlightDescription}</p><p className="uh-thankyou">{content.thanksTitle}</p><span className="uh-script-line" aria-hidden="true">{content.spotlightSignature}</span></div></section>
      <section className="uh-serve" id="serve"><div><p className="uh-kicker">{content.serveEyebrow}</p><h2>{content.nextTitle}</h2></div><div><p>{content.nextDescription}</p><div className="uh-link-card"><span aria-hidden="true">↗</span><div><h3>{content.scheduleLinkTitle}</h3><p>{content.scheduleLinkDescription}</p></div></div></div></section>
      <section className="uh-church-banner"><img src="/utica-logo.jpeg" alt="" loading="lazy" /><div><p className="uh-kicker">{content.bannerEyebrow}</p><h2>{content.bannerTitle}</h2></div><a href="https://www.uticabaptist.com/" target="_blank" rel="noreferrer">{content.bannerLinkLabel} ↗</a></section>
    </main>
    <footer className="uh-footer"><div><strong>{content.footerChurchName}</strong><p>{content.footerDescription}</p></div><span>{content.footerAddress}</span><a href="/admin">{content.footerAdminLabel} ↗</a></footer>
  </div>
}
