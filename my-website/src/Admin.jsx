import { useState } from 'react'
import { useAuthActions } from '@convex-dev/auth/react'
import { useConvexAuth, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'

function Dashboard() {
  const admin = useQuery(api.admin.me)
  const { signOut } = useAuthActions()
  const [error, setError] = useState('')
  return <section className="admin-panel" aria-labelledby="admin-title">
    <p className="eyebrow">ADMINISTRATOR</p>
    <h2 id="admin-title">{admin ? `Welcome, ${admin.username}.` : 'Checking admin access…'}</h2>
    {admin && <p>You are signed in as the website administrator. Visitors can browse the website without an account.</p>}
    <button className="button" onClick={async () => { try { await signOut() } catch { setError('Could not sign out. Please try again.') } }}>Sign out</button>
    {error && <p role="alert">{error}</p>}
  </section>
}

export default function Admin() {
  const { isLoading, isAuthenticated } = useConvexAuth()
  const { signIn } = useAuthActions()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  if (isLoading) return <section className="admin-panel"><p role="status">Checking sign-in…</p></section>
  if (isAuthenticated) return <Dashboard />
  async function submit(event) {
    event.preventDefault()
    if (pending) return
    const form = event.currentTarget
    const values = new FormData(form)
    setPending(true)
    setError('')
    try {
      await signIn('password', { email: values.get('username'), password: values.get('password'), flow: 'signIn' })
      form.reset()
    } catch {
      setError('Unable to sign in. Check your username and password, or try again later.')
    } finally { setPending(false) }
  }
  return <section className="admin-panel" aria-labelledby="admin-title">
    <p className="eyebrow">FOR THE TEAM LEADER</p><h2 id="admin-title">Admin sign-in</h2>
    <p>Visitors don’t need an account. This sign-in is for the website administrator.</p>
    <form onSubmit={submit}>
      <label htmlFor="admin-username">Username</label><input id="admin-username" name="username" autoComplete="username" required maxLength={100} />
      <label htmlFor="admin-password">Password</label><input id="admin-password" name="password" type="password" autoComplete="current-password" required maxLength={256} />
      {error && <p className="admin-error" role="alert">{error}</p>}
      <button className="button" type="submit" disabled={pending}>{pending ? 'Signing in…' : 'Sign in'}</button>
    </form>
  </section>
}
