import { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { HomeView } from './HomePage'

const fields = [
  ['heroEyebrow', 'Intro label', 200], ['heroTitle', 'Main headline', 200], ['heroDescription', 'Welcome message', 2000],
  ['ministryTitle', 'Ministry heading', 200], ['ministryDescription', 'About the ministry', 2000],
  ['welcomeTitle', 'Welcome role heading', 200], ['welcomeDescription', 'Welcome role description', 2000],
  ['supportTitle', 'Serving role heading', 200], ['supportDescription', 'Serving role description', 2000],
  ['nextTitle', 'Getting involved heading', 200], ['nextDescription', 'Getting involved description', 2000],
  ['spotlightLabel', 'Feature title', 200], ['spotlightMonth', 'Month / year', 200], ['spotlightName', 'Usher’s name', 200],
  ['spotlightDescription', 'Usher’s story and appreciation', 2000], ['spotlightPhotoAlt', 'Photo description for accessibility', 200],
  ['thanksTitle', 'Featured usher thank-you line', 200], ['bannerEyebrow', 'Closing banner label', 200], ['bannerTitle', 'Closing banner heading', 200],
]
export default function HomeEditor({ onClose }) {
  const page = useQuery(api.homepage.edit)
  return page === undefined ? <div className="admin-overlay"><p className="loading-card">Loading home page editor…</p></div> : <EditorForm initial={page} onClose={onClose} />
}
function EditorForm({ initial, onClose }) {
  const [content, setContent] = useState(initial.content)
  const [file, setFile] = useState(null)
  const [remove, setRemove] = useState(false)
  const [photoPreview, setPhotoPreview] = useState(initial.photoUrl)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState(false)
  const [saved, setSaved] = useState(false)
  const version = useRef(initial.version)
  const storedPhoto = useRef(initial.photoId)
  const dirty = useRef(false)
  const uploadUrl = useMutation(api.homepage.uploadUrl)
  const save = useMutation(api.homepage.save)
  const discard = useMutation(api.homepage.discardUpload)
  const dialogRef = useRef(null)
  useEffect(() => { dialogRef.current?.focus() }, [])
  useEffect(() => {
    if (!file) { setPhotoPreview(remove ? null : initial.photoUrl); return }
    const url = URL.createObjectURL(file)
    setPhotoPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [file, remove, initial.photoUrl])
  useEffect(() => {
    const handler = event => { if (dirty.current) { event.preventDefault(); event.returnValue = '' } }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [])
  function close() { if (!pending && (!dirty.current || confirm('Discard your unsaved homepage changes?'))) onClose() }
  async function submit(event) {
    event.preventDefault()
    if (pending) return
    setPending(true); setError(''); setSaved(false)
    let uploaded = null
    try {
      if (file) {
        const url = await uploadUrl()
        const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': file.type }, body: file })
        if (!response.ok) throw new Error('Photo upload failed. Please try again.')
        uploaded = (await response.json()).storageId
      }
      const result = await save({ content, photoId: uploaded || (remove ? null : storedPhoto.current), version: version.current })
      version.current = result.version
      storedPhoto.current = uploaded || (remove ? null : storedPhoto.current)
      dirty.current = false; setSaved(true)
      // Keep the selected preview visible; close and reopen to upload another image.
      onClose(true)
    } catch (e) {
      if (uploaded) { try { await discard({ photoId: uploaded }) } catch { /* Upload can be cleaned up later by an administrator. */ } }
      setError(e.message || 'Could not save the home page. Please try again.')
    } finally { setPending(false) }
  }
  return <div className="admin-overlay"><section className="uh-editor" role="dialog" aria-modal="true" aria-labelledby="home-editor-title" tabIndex={-1} ref={dialogRef} onKeyDown={event => {
    if (event.key === 'Escape') { event.preventDefault(); close() }
    if (event.key === 'Tab') {
      const elements = [...dialogRef.current.querySelectorAll('a[href], button:not(:disabled), input:not(:disabled), textarea:not(:disabled)')]
      const first = elements[0], last = elements[elements.length - 1]
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) { event.preventDefault(); last?.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
    }
  }}>
    <header className="builder-header"><div><p className="eyebrow">YOUR CHURCH’S WELCOME</p><h2 id="home-editor-title">Edit home page</h2></div><button className="icon-button" onClick={close} disabled={pending} aria-label="Close home page editor">×</button></header>
    <div className="uh-editor-toolbar"><p>Your changes appear publicly when you save. Schedule links stay separate.</p><button className="secondary-button" onClick={() => setPreview(!preview)}>{preview ? 'Return to editing' : 'Preview changes'}</button></div>
    {preview ? <div className="uh-editor-preview"><HomeView content={content} photoUrl={photoPreview} /></div> : <form id="homepage-form" className="uh-editor-form" onSubmit={submit}>
      <fieldset disabled={pending}><legend>Home page content</legend><div className="uh-editor-fields">{fields.map(([key, label, max]) => <label key={key}>{label}{max > 200 || key.endsWith('Title') ? <textarea rows={max > 200 ? 4 : 2} value={content[key]} maxLength={max} onChange={e => { dirty.current = true; setSaved(false); setContent({ ...content, [key]: e.target.value }) }} required={['heroTitle', 'ministryTitle', 'nextTitle'].includes(key)} /> : <input value={content[key]} maxLength={max} onChange={e => { dirty.current = true; setSaved(false); setContent({ ...content, [key]: e.target.value }) }} />}</label>)}</div></fieldset>
      <fieldset disabled={pending}><legend>Usher of the Month photo</legend><p>Choose a portrait photo in JPG, PNG, or WebP format, up to 8 MB.</p>{photoPreview && <img className="uh-upload-preview" src={photoPreview} alt={content.spotlightPhotoAlt || 'Selected usher photo preview'} />}<label>Upload portrait<input type="file" accept="image/jpeg,image/png,image/webp" onChange={e => {
        const selected = e.target.files?.[0]
        if (!selected) return
        if (!['image/jpeg','image/png','image/webp'].includes(selected.type) || selected.size > 8 * 1024 * 1024) { setError('Choose a JPG, PNG, or WebP image under 8 MB.'); e.target.value = ''; return }
        setError(''); dirty.current = true; setFile(selected); setRemove(false)
      }} /></label>{photoPreview && <button type="button" className="secondary-button" onClick={() => { dirty.current = true; setFile(null); setRemove(true) }}>Remove photo</button>}</fieldset>
    </form>}
    <footer className="uh-editor-footer">{error && <p role="alert" className="inline-error">{error}</p>}{saved && <p role="status">Home page saved.</p>}<button className="secondary-button" onClick={close} disabled={pending}>Cancel</button><button className="primary-button" onClick={submit} disabled={pending}>{pending ? 'Saving…' : 'Save & publish home page'}</button></footer>
  </section></div>
}
