import { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { HomeView } from './HomePage'
import { homeFieldLabels } from './homeTextFields'

export default function HomeEditor() {
  const page = useQuery(api.homepage.edit)
  return page === undefined ? <main className="admin-entry-page"><p role="status">Loading home page editor...</p></main> : <LiveEditor initial={page} />
}

export function LiveEditor({ initial }) {
  const [content, setContent] = useState(initial.content)
  const [file, setFile] = useState(null)
  const [remove, setRemove] = useState(false)
  const [photoPreview, setPhotoPreview] = useState(initial.photoUrl)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState(false)
  const [dirty, setDirty] = useState(false)
  const [saved, setSaved] = useState(false)
  const version = useRef(initial.version)
  const storedPhoto = useRef(initial.photoId)
  const uploadedFile = useRef(null)
  const fileInput = useRef(null)
  const uploadUrl = useMutation(api.homepage.uploadUrl)
  const save = useMutation(api.homepage.save)
  const discard = useMutation(api.homepage.discardUpload)
  useEffect(() => {
    if (!file) { setPhotoPreview(remove ? null : initial.photoUrl); return }
    const url = URL.createObjectURL(file)
    setPhotoPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [file, remove, initial.photoUrl])
  useEffect(() => {
    const handler = event => { if (dirty) { event.preventDefault(); event.returnValue = '' } }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [dirty])
  function change(key, value) {
    setContent(current => ({ ...current, [key]: value }))
    setDirty(true); setSaved(false)
  }
  function leave() {
    if (pending || (dirty && !confirm('Discard your unsaved home page changes?'))) return
    window.location.assign('/admin')
  }
  async function publish() {
    if (pending) return
    setPending(true); setError(''); setSaved(false)
    let uploaded = null
    try {
      if (file && uploadedFile.current !== file) {
        const url = await uploadUrl()
        const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': file.type }, body: file })
        if (!response.ok) throw new Error('Photo upload failed. Please try again.')
        uploaded = (await response.json()).storageId
      }
      const result = await save({ content, photoId: uploaded || (remove ? null : storedPhoto.current), version: version.current })
      version.current = result.version
      storedPhoto.current = uploaded || (remove ? null : storedPhoto.current)
      if (uploaded) uploadedFile.current = file
      setDirty(false); setSaved(true)
    } catch (e) {
      if (uploaded) { try { await discard({ photoId: uploaded }) } catch { /* A later admin cleanup can remove an unused upload. */ } }
      setError(e.message || 'Could not save the home page. Please try again.')
    } finally { setPending(false) }
  }
  const photoControls = <fieldset className="uh-live-photo" disabled={pending}>
    <legend>Featured usher photo</legend>
    <label>Upload portrait<input ref={fileInput} type="file" accept="image/jpeg,image/png,image/webp" onChange={event => {
      const selected = event.target.files?.[0]
      if (!selected) return
      if (!['image/jpeg','image/png','image/webp'].includes(selected.type) || selected.size > 8 * 1024 * 1024) { setError('Choose a JPG, PNG, or WebP photo under 8 MB.'); event.target.value = ''; return }
      setError(''); setDirty(true); setSaved(false); setFile(selected); setRemove(false)
    }} /></label><small>JPG, PNG, or WebP. Maximum 8 MB. Changes are published when you save.</small>
    <label>Photo description<input value={content.spotlightPhotoAlt} maxLength={200} onChange={event => change('spotlightPhotoAlt', event.target.value)} /></label>
    {photoPreview && <button type="button" onClick={() => { setDirty(true); setSaved(false); setFile(null); setRemove(true); if (fileInput.current) fileInput.current.value = '' }}>Remove photo</button>}
  </fieldset>
  return <div className="uh-live-editor">
    <header className="uh-live-toolbar" aria-label="Home page editing controls">
      <div><strong>{preview ? 'Preview home page' : 'Editing home page'}</strong><p>{preview ? 'This is how your draft will look to visitors.' : 'Type directly in the outlined text boxes below.'}</p></div>
      <span className="uh-live-status" role="status">{pending ? 'Saving...' : saved ? 'Changes published' : dirty ? 'Unsaved changes' : 'Changes stay private until you save'}</span>
      <div className="uh-live-actions"><button onClick={leave} disabled={pending}>Back to admin</button><button onClick={() => setPreview(!preview)} disabled={pending}>{preview ? 'Keep editing' : 'Preview'}</button><button className="uh-live-save" onClick={publish} disabled={pending || !dirty}>{pending ? 'Saving...' : 'Save & publish'}</button></div>
      {error && <p className="uh-live-error" role="alert">{error}</p>}
    </header>
    {!preview && <details className="uh-live-settings"><summary>Accessibility text &amp; fallback heading</summary><p>These labels are used by screen readers or when no featured usher name is entered.</p><fieldset disabled={pending}>{['skipLabel', 'navigationLabel', 'brandLogoAlt', 'spotlightFallbackTitle'].map(key => <label key={key}>{homeFieldLabels[key]}<input value={content[key]} maxLength={200} onChange={event => change(key, event.target.value)} /></label>)}</fieldset></details>}
    <HomeView content={content} photoUrl={photoPreview} signedIn={!preview} onChange={preview ? undefined : change} pending={pending} photoControls={preview ? undefined : photoControls} lockNavigation />
  </div>
}
