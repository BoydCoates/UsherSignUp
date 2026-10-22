import { Component } from 'react'
import { useConvexAuth, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { homeDefaults } from '../../shared/homeContent'
import './HomePage.css'
import HomeEditor from './HomeEditor'
import { HomeEditingContext, HomeText, HomeLink } from './HomeText'

class HomeDataBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? <HomeView content={homeDefaults} /> : this.props.children }
}
function ConnectedHome() {
  const data = useQuery(api.homepage.get)
  const { isAuthenticated, isLoading } = useConvexAuth()
  if (new URLSearchParams(window.location.search).get('edit') === 'homepage') {
    if (isLoading) return <main className="admin-entry-page"><p role="status">Checking admin access...</p></main>
    if (!isAuthenticated) return <main className="admin-entry-page"><section className="admin-panel"><h1>Sign in to edit</h1><p>Only administrators can edit the home page.</p><a className="button" href="/admin?edit=homepage">Admin sign in</a><a className="admin-back-link" href="/">Return to home page</a></section></main>
    return <HomeEditor />
  }
  return <HomeView content={data?.content ?? homeDefaults} photoUrl={data?.photoUrl} signedIn={isAuthenticated} />
}
export default function HomePage({ backendConfigured }) {
  return backendConfigured ? <HomeDataBoundary><ConnectedHome /></HomeDataBoundary> : <HomeView content={homeDefaults} />
}
export function HomeView({ content, photoUrl, signedIn = false, onChange, pending = false, photoControls, lockNavigation = false }) {
  content = { ...homeDefaults, ...content }
  return <HomeEditingContext.Provider value={{ content, onChange, pending }}><div className={`utica-home${onChange ? ' uh-editing-home' : ''}`} onClickCapture={event => {
    const link = event.target.closest('a')
    if (lockNavigation && link && (onChange || !link.getAttribute('href')?.startsWith('#'))) event.preventDefault()
  }}>
    <HomeLink className="skip-link" href="#home-main"><HomeText field="skipLabel" /></HomeLink>
    <div className="uh-topline"><span><HomeText field="topChurchName" /></span><span><HomeText field="topTagline" /></span><HomeLink href="https://www.uticabaptist.com/" target="_blank" rel="noreferrer"><HomeText field="topWebsiteLabel" /> ↗</HomeLink></div>
    <header className="uh-nav"><HomeLink className="uh-brand" href="/"><img src="/utica-logo.jpeg" alt={content.brandLogoAlt} /><span><HomeText field="brandName" /> <small><HomeText field="brandSubtitle" /></small></span></HomeLink><nav aria-label={content.navigationLabel}><HomeLink href="#ministry"><HomeText field="navMinistry" /></HomeLink><HomeLink href="#usher-of-the-month"><HomeText field="navSpotlight" /></HomeLink><HomeLink className="uh-nav-cta" href="#serve"><HomeText field="navServe" /> ↗</HomeLink></nav></header>
    {signedIn && <div className="uh-admin-bar"><HomeText field="adminStatus" /> <HomeLink href="/?edit=homepage"><HomeText field="adminEditLabel" /> →</HomeLink></div>}
    <main id="home-main">
      <section className="uh-hero"><div className="uh-hero-photo" aria-hidden="true" /><div className="uh-hero-shade" /><div className="uh-hero-copy"><p className="uh-kicker"><HomeText field="heroEyebrow" /></p><h1><HomeText field="heroTitle" /></h1><p><HomeText field="heroDescription" /></p><div className="uh-hero-actions"><HomeLink className="uh-button" href="#serve"><HomeText field="heroPrimaryLabel" /> <span>↗</span></HomeLink><HomeLink className="uh-quiet-link" href="#ministry"><HomeText field="heroSecondaryLabel" /> ↓</HomeLink></div></div><div className="uh-hero-bottom"><span><HomeText field="heroFooterLabel" /></span><span><HomeText field="heroFooterTagline" /></span><span aria-hidden="true">↓</span></div></section>
      <section className="uh-purpose" id="ministry"><div><p className="uh-kicker"><HomeText field="ministryEyebrow" /></p><h2><HomeText field="ministryTitle" /></h2><div className="uh-green-rule" /></div><div><p className="uh-lead"><HomeText field="ministryDescription" /></p><div className="uh-role-row"><article><span><HomeText field="welcomeNumber" /></span><h3><HomeText field="welcomeTitle" /></h3><p><HomeText field="welcomeDescription" /></p></article><article><span><HomeText field="supportNumber" /></span><h3><HomeText field="supportTitle" /></h3><p><HomeText field="supportDescription" /></p></article></div></div></section>
      <section className="uh-spotlight" id="usher-of-the-month"><div className="uh-portrait"><div className="uh-portrait-frame">{photoUrl ? <img src={photoUrl} alt={content.spotlightPhotoAlt || content.spotlightName} loading="lazy" /> : <div className="uh-photo-placeholder"><svg viewBox="0 0 120 120" fill="none" aria-hidden="true"><circle cx="60" cy="40" r="20" stroke="currentColor" strokeWidth="2"/><path d="M20 108V98a40 40 0 0180 0v10" stroke="currentColor" strokeWidth="2"/></svg><span><HomeText field="spotlightPlaceholder" /></span></div>}</div>{photoControls}<span className="uh-photo-corner" aria-hidden="true">✳</span></div><div className="uh-spotlight-copy"><p className="uh-kicker"><HomeText field="spotlightEyebrow" /></p><div className="uh-feature-label"><span><HomeText field="spotlightLabel" /></span>{(onChange || content.spotlightMonth) && <span><HomeText field="spotlightMonth" placeholder="Month / year" /></span>}</div><h2><HomeText field={onChange || content.spotlightName ? 'spotlightName' : 'spotlightFallbackTitle'} placeholder="Featured usher's name" /></h2><p className="uh-spotlight-story"><HomeText field="spotlightDescription" /></p><p className="uh-thankyou"><HomeText field="thanksTitle" /></p><span className="uh-script-line"><HomeText field="spotlightSignature" /></span></div></section>
      <section className="uh-serve" id="serve"><div><p className="uh-kicker"><HomeText field="serveEyebrow" /></p><h2><HomeText field="nextTitle" /></h2></div><div><p><HomeText field="nextDescription" /></p><div className="uh-link-card"><span aria-hidden="true">↗</span><div><h3><HomeText field="scheduleLinkTitle" /></h3><p><HomeText field="scheduleLinkDescription" /></p></div></div></div></section>
      <section className="uh-church-banner"><img src="/utica-logo.jpeg" alt="" loading="lazy" /><div><p className="uh-kicker"><HomeText field="bannerEyebrow" /></p><h2><HomeText field="bannerTitle" /></h2></div><HomeLink href="https://www.uticabaptist.com/" target="_blank" rel="noreferrer"><HomeText field="bannerLinkLabel" /> ↗</HomeLink></section>
    </main>
    <footer className="uh-footer"><div><strong><HomeText field="footerChurchName" /></strong><p><HomeText field="footerDescription" /></p></div><span><HomeText field="footerAddress" /></span><HomeLink href="/admin"><HomeText field="footerAdminLabel" /> ↗</HomeLink></footer>
  </div></HomeEditingContext.Provider>
}
