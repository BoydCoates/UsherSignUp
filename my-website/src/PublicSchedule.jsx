import { useEffect, useMemo, useRef, useState } from 'react'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'

function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T12:00:00Z`))
}
function randomToken() {
  const bytes = new Uint8Array(32); crypto.getRandomValues(bytes)
  return [...bytes].map((byte) => byte.toString(16).padStart(2, '0')).join('')
}
async function hashToken(token) {
  const bytes = new TextEncoder().encode(token)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

export default function PublicSchedule({ publicId, cancelMode = false }) {
  const schedule = useQuery(api.public.schedule, cancelMode ? 'skip' : { publicId })
  const createSignup = useMutation(api.public.createSignup)
  const cancelSignup = useMutation(api.public.cancelSignup)
  const [selected, setSelected] = useState(null)
  const [name, setName] = useState('')
  const [pending, setPending] = useState(false)
  const [notice, setNotice] = useState(null)
  const [error, setError] = useState('')
  const [cancelling, setCancelling] = useState(false)
  const submitting = useRef(false)
  const pendingSignup = useRef(null)
  const [savedLinks, setSavedLinks] = useState(() => { try { return JSON.parse(localStorage.getItem('usher-cancel-links') || '[]') } catch { return [] } })
  const token = useMemo(() => new URLSearchParams(location.search).get('token') || '', [])
  const canSignUp = schedule?.status === 'published'
  useEffect(() => { if (cancelMode) document.referrerPolicy = 'no-referrer' }, [cancelMode])

  async function submit(event) {
    event.preventDefault(); if (submitting.current) return
    const clean = name.trim().replace(/\s+/g, ' ')
    if (clean.length < 2 || clean.length > 80) { setError('Please enter your first and last name.'); return }
    submitting.current = true; setPending(true); setError('')
    const key = `usher-signup-retry:${publicId}`
    let retry = pendingSignup.current
    try { retry ||= JSON.parse(sessionStorage.getItem(key) || 'null') } catch { /* Keep the in-memory fallback. */ }
    if (!retry || retry.name !== clean || retry.positionId !== selected.id) retry = { name: clean, positionId: selected.id, token: randomToken(), requestId: crypto.randomUUID() }
    pendingSignup.current = retry
    try { sessionStorage.setItem(key, JSON.stringify(retry)) } catch { /* The private link is still shown after success. */ }
    try {
      await createSignup({ publicId, positionId: selected.id, name: clean, cancellationHash: await hashToken(retry.token), requestId: retry.requestId })
      const cancelUrl = `${location.origin}/cancel?token=${retry.token}`
      try {
        const saved = JSON.parse(localStorage.getItem('usher-cancel-links') || '[]')
        const next = [{ name: clean, title: schedule.title, date: schedule.serviceDate, url: cancelUrl }, ...saved.filter((item) => item.url !== cancelUrl)].slice(0, 20)
        localStorage.setItem('usher-cancel-links', JSON.stringify(next)); setSavedLinks(next)
        sessionStorage.removeItem(key)
      } catch { /* The usher can still copy the private link from this confirmation. */ }
      pendingSignup.current = null
      setNotice({ kind: 'signed', name: clean, position: selected.name, date: schedule.serviceDate, cancelUrl })
      setSelected(null); setName('')
    } catch (e) { setError(e.message?.replace(/^Error: /, '') || 'We could not save your sign-up. Please try again.') }
    finally { submitting.current = false; setPending(false) }
  }

  async function doCancel() {
    if (cancelling) return
    setCancelling(true); setError('')
    try {
      const result = await cancelSignup({ cancellationHash: await hashToken(token) })
      try {
        const saved = JSON.parse(localStorage.getItem('usher-cancel-links') || '[]')
        const next = saved.filter((item) => !item.url.endsWith(token))
        localStorage.setItem('usher-cancel-links', JSON.stringify(next)); setSavedLinks(next)
      } catch { /* Cancellation succeeded; local device storage is optional. */ }
      setNotice({ kind: 'cancelled', ...result })
    } catch (e) { setError(e.message?.replace(/^Error: /, '') || 'We could not cancel this sign-up. Please try again.') }
    finally { setCancelling(false) }
  }

  if (cancelMode) return <main className="public-shell"><header className="public-top"><a className="brand" href="/"><img className="brand-logo" src="/utica-logo.jpeg" alt="" />Usher Sign Up</a></header><div className="cancel-page"><a className="back-link" href="/">← Back to welcome</a>{notice ? <section className="confirmation-modal cancel-confirmation"><span className="confirmation-mark">✓</span><p className="eyebrow">SIGN-UP CANCELLED</p><h1>Your place is open again.</h1><p className="confirmation-copy">Your sign-up for <strong>{notice.scheduleTitle}</strong> on {formatDate(notice.serviceDate)} has been removed.</p><a className="primary-button full-button" href="/">Return home</a></section> : <section className="confirmation-modal cancel-confirmation"><span className="confirmation-mark cancel-mark">↺</span><p className="eyebrow">PRIVATE CANCELLATION LINK</p><h1>Cancel your sign-up?</h1><p className="confirmation-copy">This will remove your place and make it available to another usher.</p>{!token && <p className="form-error" role="alert">This cancellation link is missing its private token.</p>}{error && <p className="form-error" role="alert">{error}</p>}<button className="danger-button full-button" disabled={cancelling || !token} onClick={doCancel}>{cancelling ? 'Cancelling…' : 'Yes, cancel my sign-up'}</button><a className="cancel-return" href="/">I changed my mind</a></section>}</div></main>

  if (schedule === undefined) return <main className="public-shell"><p className="loading-card" role="status">Loading service schedule…</p></main>
  if (!schedule) return <main className="public-shell"><a className="brand back-brand" href="/">← Usher Sign Up</a><section className="empty-card"><span className="empty-icon">⌕</span><h1>Schedule not found</h1><p>This link may be incorrect, or the schedule is no longer published.</p><a className="primary-button" href="/">Return home</a></section></main>

  return <main className="public-shell">
    <header className="public-top"><a className="brand" href="/"><img className="brand-logo" src="/utica-logo.jpeg" alt="" />Usher Sign Up</a><span className="public-label">COMMUNITY · SERVICE TEAM</span></header>
    <div className="public-content">
      <a className="back-link" href="/">← Back to welcome</a>
      <section className="schedule-hero"><div className="hero-spark">✳</div><p className="eyebrow">LET’S SERVE TOGETHER</p><h1>{schedule.title}</h1><p className="schedule-date">{formatDate(schedule.serviceDate)}{schedule.serviceTime ? ` · ${schedule.serviceTime}` : ''}</p>{schedule.instructions && <p className="schedule-instructions">{schedule.instructions}</p>}
        <div className={`schedule-state state-${schedule.status}`}><span className="state-dot" />{schedule.status === 'published' ? 'Sign-ups are open' : schedule.status === 'closed' ? 'Sign-ups are closed' : 'Service completed'}</div>
      </section>
      {schedule.status !== 'published' && <div className="closed-note">{schedule.status === 'closed' ? 'You can still view the team roster, but sign-ups and cancellations are closed.' : 'This service schedule is available for reference.'}</div>}
      <div className="position-heading"><div><p className="eyebrow">FIND YOUR PLACE</p><h2>Choose a position</h2></div><p>One position per person for this service.</p></div>
      <div className="category-list">{schedule.categories.map((category) => <section className="public-category" key={category.id}><div className="category-title"><span className="category-star">✳</span><h3>{category.name}</h3></div><div className="position-list">{category.positions.map((position) => {
        const status = position.remaining === 0 ? 'full' : position.remaining === 1 ? 'almost' : 'available'
        return <article className={`position-card ${status}`} key={position.id}>
          <div className="position-main"><div><h4>{position.name}</h4><p className="spots-count">{position.filled} of {position.capacity} spots filled</p></div><span className={`availability-pill ${status}`}>{status === 'full' ? 'Full' : status === 'almost' ? '1 spot left' : `${position.remaining} ${position.remaining === 1 ? 'spot' : 'spots'} left`}</span></div>
          {position.names.length ? <div className="signed-names"><span className="people-icon">♧</span><span>{position.names.join(' · ')}</span></div> : <div className="signed-names muted-names">No one has signed up yet</div>}
          <button className="position-action" disabled={!canSignUp || status === 'full'} onClick={() => { setSelected({ ...position, category: category.name }); setName(''); setError('') }}>{status === 'full' ? 'Position full' : canSignUp ? 'Sign up for this position' : 'Sign-ups closed'}{status !== 'full' && canSignUp && <span>→</span>}</button>
        </article>
      })}</div></section>)}</div>
      {savedLinks.length > 0 && <details className="saved-links"><summary>Find a saved cancellation link on this device <span>({savedLinks.length})</span></summary><p>These private links are stored only in this browser. Anyone who can use this browser can open them.</p>{savedLinks.map((item) => <div className="saved-link-row" key={item.url}><span><strong>{item.name}</strong><small>{item.title} · {formatDate(item.date)}</small></span><a href={item.url}>Open cancellation link ↗</a></div>)}</details>}
      <p className="privacy-note">Names are visible to everyone with this schedule link. No account or email is needed.</p>
    </div>
    <footer className="public-footer">Serving together, welcoming everyone. <span>·</span> <a href="/">Usher Sign Up</a></footer>

    {selected && <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget && !pending) setSelected(null) }}><section className="signup-modal" role="dialog" aria-modal="true" aria-labelledby="signup-title"><img className="signup-photo" src="/downstairs-aisles.png" alt="Church sanctuary aisles" /><button className="modal-close" aria-label="Close" onClick={() => setSelected(null)}>×</button><p className="eyebrow">YOUR PLACE TO SERVE</p><h2 id="signup-title">You’re signing up</h2><div className="selected-position"><span>✳</span><div><strong>{selected.name}</strong><small>{selected.category} · {formatDate(schedule.serviceDate)}</small></div></div><form onSubmit={submit}><label htmlFor="usher-name">Your first and last name</label><input id="usher-name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Jordan Lee" maxLength={80} autoFocus required /><p className="form-helper">Please use the name your team knows you by.</p>{error && <p className="form-error" role="alert">{error}</p>}<button className="primary-button full-button" disabled={pending}>{pending ? 'Saving your place…' : 'Confirm sign-up'}</button></form><p className="cancel-helper">After signing up, you’ll receive a private cancellation link. Save it somewhere safe; it can’t be recovered if lost.</p></section></div>}

    {notice && <div className="modal-backdrop"><section className="confirmation-modal" role="dialog" aria-modal="true"><span className="confirmation-mark">{notice.kind === 'signed' ? '✓' : '↺'}</span><p className="eyebrow">{notice.kind === 'signed' ? 'YOU’RE ALL SET' : 'SIGN-UP CANCELLED'}</p><h2>{notice.kind === 'signed' ? 'Thanks for serving!' : 'Your place is open again.'}</h2>{notice.kind === 'signed' ? <><p className="confirmation-copy"><strong>{notice.name}</strong>, you’re signed up for <strong>{notice.position}</strong> on {formatDate(notice.date)}.</p><div className="private-link-box"><strong>Keep your cancellation link</strong><p>Save this private link somewhere safe. It’s the only way to cancel later; we can’t recover it if you lose it.</p><input readOnly value={notice.cancelUrl} aria-label="Private cancellation link" /><button className="secondary-button" onClick={async () => { try { await navigator.clipboard.writeText(notice.cancelUrl); setError('Cancellation link copied.') } catch { setError('Copy failed. Select and copy the link above.') } }}>{error || 'Copy private link'}</button></div></> : <p className="confirmation-copy">Your sign-up for <strong>{notice.scheduleTitle}</strong> on {formatDate(notice.serviceDate)} has been removed.</p>}<button className="primary-button full-button" onClick={() => { setNotice(null); setError('') }}>Return to schedule</button></section></div>}

  </main>
}
