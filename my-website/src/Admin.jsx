import { Component, useEffect, useMemo, useState } from 'react'
import { useAuthActions } from '@convex-dev/auth/react'
import { useConvexAuth, useMutation, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'

const makeId = () => crypto.randomUUID()
const emptyCategory = (order) => ({ id: makeId(), name: 'New category', order, positions: [] })
const initialForm = () => ({ title: '', serviceDate: '', serviceTime: '', instructions: '', categories: [], status: 'draft' })
const dateLabel = (date) => new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T12:00:00Z`))
const allPositions = (categories) => categories.flatMap((c) => c.positions.map((p) => ({ ...p, categoryName: c.name })))
const reorder = (items, index, direction) => { const next = [...items]; const target = index + direction; if (target < 0 || target >= next.length) return items; [next[index], next[target]] = [next[target], next[index]]; return next.map((item, order) => ({ ...item, order })) }

function useActions() {
  return {
    saveSchedule: useMutation(api.admin.saveSchedule),
    changeStatus: useMutation(api.admin.changeStatus),
    duplicateSchedule: useMutation(api.admin.duplicateSchedule),
    deleteSchedule: useMutation(api.admin.deleteSchedule),
    saveTemplate: useMutation(api.admin.saveTemplate),
    duplicateTemplate: useMutation(api.admin.duplicateTemplate),
    deleteTemplate: useMutation(api.admin.deleteTemplate),
    addSignup: useMutation(api.admin.addSignup),
    updateSignup: useMutation(api.admin.updateSignup),
    removeSignup: useMutation(api.admin.removeSignup),
  }
}

function Editor({ initial, onClose, actions }) {
  const rosterData = useQuery(api.admin.roster, initial.id ? { scheduleId: initial.id } : 'skip')
  const [form, setForm] = useState(initial)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState(false)
  const countPosition = (positionId) => rosterData?.signups.filter((s) => s.positionId === positionId).length || 0
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))
  const editCategory = (id, values) => update('categories', form.categories.map((category) => category.id === id ? { ...category, ...values } : category))
  const move = (items, index, direction) => { const next = [...items]; const target = index + direction; if (target < 0 || target >= next.length) return items; [next[index], next[target]] = [next[target], next[index]]; return next.map((item, order) => ({ ...item, order })) }
  const hasSignups = (positionId) => countPosition(positionId) > 0

  async function save(status = form.status) {
    if (pending) return
    setPending(true); setError('')
    try { await actions.saveSchedule({ id: form.id, title: form.title, serviceDate: form.serviceDate, serviceTime: form.serviceTime || undefined, instructions: form.instructions, categories: form.categories, status, sourceTemplateId: form.sourceTemplateId }); onClose() }
    catch (e) { setError(e.message?.replace(/^Error: /, '') || 'Could not save the schedule.') }
    finally { setPending(false) }
  }

  return <div className="admin-overlay"><section className="builder-panel" role="dialog" aria-modal="true" aria-labelledby="builder-title">
    <header className="builder-header"><div><p className="eyebrow">SCHEDULE BUILDER</p><h2 id="builder-title">{form.id ? 'Edit schedule' : 'Create a schedule'}</h2></div><button className="icon-button" onClick={onClose} aria-label="Close builder">×</button></header>
    <div className="builder-scroll">
      <div className="builder-step"><span className="step-badge">01</span><div className="step-body"><h3>Service details</h3><div className="builder-grid"><label>Schedule title<input value={form.title} onChange={(e) => update('title', e.target.value)} placeholder="Sunday Morning Service" maxLength={120} /></label><label>Service date<input type="date" value={form.serviceDate} onChange={(e) => update('serviceDate', e.target.value)} /></label><label>Service time <span className="optional-label">optional</span><input value={form.serviceTime} onChange={(e) => update('serviceTime', e.target.value)} placeholder="9:00 AM" maxLength={50} /></label></div><label className="wide-label">Instructions or announcement <span className="optional-label">optional</span><textarea value={form.instructions} onChange={(e) => update('instructions', e.target.value)} placeholder="Share arrival details or helpful notes for the team…" rows="3" maxLength={3000} /></label></div></div>
      <div className="builder-step"><span className="step-badge">02</span><div className="step-body"><div className="step-title-row"><div><h3>Categories & positions</h3><p>Group positions and set how many ushers are needed.</p></div><button className="soft-button" onClick={() => update('categories', [...form.categories, emptyCategory(form.categories.length)])}>＋ Add category</button></div>
        {form.categories.length === 0 && <div className="builder-empty"><span>✳</span><strong>Start with a category</strong><p>Examples: Front Entrance, Sanctuary, Offering</p><button className="text-button" onClick={() => update('categories', [...form.categories, emptyCategory(0)])}>＋ Add first category</button></div>}
        <div className="builder-categories">{form.categories.map((category, index) => <article className="builder-category" key={category.id}><div className="builder-category-head"><div className="order-controls"><button aria-label="Move category up" disabled={!index} onClick={() => update('categories', move(form.categories, index, -1))}>↑</button><button aria-label="Move category down" disabled={index === form.categories.length - 1} onClick={() => update('categories', move(form.categories, index, 1))}>↓</button></div><input aria-label="Category name" value={category.name} onChange={(e) => editCategory(category.id, { name: e.target.value })} /><button className="remove-button" onClick={() => { if (category.positions.some((p) => hasSignups(p.id)) && !confirm('This category has active sign-ups. Removing a position with sign-ups is blocked. Move or remove sign-ups in the roster first. Remove this category from the draft editor?')) return; update('categories', form.categories.filter((item) => item.id !== category.id)) }}>Remove</button></div>
          {category.positions.map((position, pIndex) => <div className="builder-position" key={position.id}><div className="order-controls"><button aria-label="Move position up" disabled={!pIndex} onClick={() => editCategory(category.id, { positions: move(category.positions, pIndex, -1) })}>↑</button><button aria-label="Move position down" disabled={pIndex === category.positions.length - 1} onClick={() => editCategory(category.id, { positions: move(category.positions, pIndex, 1) })}>↓</button></div><input aria-label="Position name" value={position.name} onChange={(e) => editCategory(category.id, { positions: category.positions.map((item) => item.id === position.id ? { ...item, name: e.target.value } : item) })} /><label className="capacity-input">Capacity<input type="number" min="1" max="100" value={position.capacity} onChange={(e) => editCategory(category.id, { positions: category.positions.map((item) => item.id === position.id ? { ...item, capacity: Number(e.target.value) } : item) })} /></label><button className="remove-button" onClick={() => { const count = countPosition(position.id); if (count && !confirm(`${count} usher${count === 1 ? '' : 's'} signed up for ${position.name}. You must move or remove those sign-ups in the roster before this position can be removed. Continue editing?`)) return; editCategory(category.id, { positions: category.positions.filter((item) => item.id !== position.id) }) }}>Remove</button></div>)}
          <button className="add-position" onClick={() => editCategory(category.id, { positions: [...category.positions, { id: makeId(), name: '', capacity: 2, order: category.positions.length }] })}>＋ Add position</button>
        </article>)}</div>
      </div></div>
      {error && <p className="inline-error" role="alert">{error}</p>}
    </div>
    <footer className="builder-footer"><button className="secondary-button" onClick={() => setPreview(true)}>Preview schedule</button><div><button className="secondary-button" disabled={pending} onClick={() => save('draft')}>Save draft</button><button className="primary-button" disabled={pending} onClick={() => save('published')}>{pending ? 'Saving…' : 'Publish schedule'}</button></div></footer>
    {preview && <div className="admin-overlay preview-overlay"><section className="preview-panel"><button className="icon-button preview-close" onClick={() => setPreview(false)}>×</button><p className="eyebrow">PUBLIC PREVIEW</p><h2>{form.title || 'Schedule title'}</h2><p className="schedule-date">{form.serviceDate ? dateLabel(form.serviceDate) : 'Choose a service date'}{form.serviceTime && ` · ${form.serviceTime}`}</p><p>{form.instructions || 'No additional instructions.'}</p>{form.categories.map((category) => <div className="preview-category" key={category.id}><h3>{category.name}</h3>{category.positions.map((position) => <div key={position.id}><span>{position.name || 'Position'}</span><small>{countPosition(position.id)} of {position.capacity} spots filled</small></div>)}</div>)}<button className="primary-button" onClick={() => setPreview(false)}>Back to builder</button></section></div>}
  </section></div>
}

function TemplateManager({ templates, actions, onClose, onUseTemplate }) {
  const [editing, setEditing] = useState(null)
  const [preview, setPreview] = useState(null)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  async function save(e) { e.preventDefault(); setPending(true); setError(''); const data = new FormData(e.currentTarget); try { await actions.saveTemplate({ id: editing?._id, name: data.get('name'), description: data.get('description'), categories: editing?.categories || [] }); setEditing(null) } catch (err) { setError(err.message?.replace(/^Error: /, '') || 'Could not save template.') } finally { setPending(false) } }
  const updateStructure = (categories) => setEditing((value) => ({ ...value, categories }))
  return <div className="admin-overlay"><section className="manager-panel" role="dialog" aria-modal="true"><header className="builder-header"><div><p className="eyebrow">REUSABLE BUILDERS</p><h2>Schedule templates</h2></div><button className="icon-button" onClick={onClose}>×</button></header><p className="manager-intro">Save your usual categories and positions. Every new schedule gets its own copy, so template changes never affect existing services.</p>
    <button className="soft-button" onClick={() => setEditing({ name: '', description: '', categories: [] })}>＋ Create a template</button>
    <div className="template-list">{templates?.map((template) => <article className="template-card" key={template._id}><div><h3>{template.name}</h3><p>{template.description || 'No description'}</p><small>{template.categories.length} categories · {template.categories.reduce((sum, c) => sum + c.positions.length, 0)} positions</small></div><div className="template-actions"><button onClick={() => onUseTemplate(template)}>Use template</button><button onClick={() => setPreview(template)}>Preview</button><button onClick={() => setEditing(template)}>Edit</button><button onClick={async () => { try { await actions.duplicateTemplate({ id: template._id }) } catch (e) { setError(e.message) } }}>Duplicate</button><button className="remove-button" onClick={async () => { if (!confirm(`Delete template “${template.name}”? Existing schedules created from it are not affected.`)) return; try { await actions.deleteTemplate({ id: template._id }) } catch (e) { setError(e.message) } }}>Delete</button></div></article>)}{templates?.length === 0 && <div className="builder-empty"><span>✳</span><strong>No templates yet</strong><p>Save a common setup to make weekly scheduling faster.</p></div>}</div>
    {error && <p className="inline-error" role="alert">{error}</p>}
    {editing && <div className="admin-overlay nested-overlay"><form className="template-form template-structure-form" onSubmit={save}><button type="button" className="icon-button template-close" onClick={() => setEditing(null)}>×</button><p className="eyebrow">TEMPLATE DETAILS</p><h2>{editing._id ? 'Edit template' : 'New template'}</h2><label>Template name<input name="name" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} required maxLength={100} placeholder="Standard Sunday Service" /></label><label>Description <span className="optional-label">optional</span><textarea name="description" value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows="2" maxLength={1000} /></label><div className="template-structure-heading"><h3>Categories & positions</h3><button type="button" className="soft-button" onClick={() => updateStructure([...editing.categories, emptyCategory(editing.categories.length)])}>＋ Add category</button></div>{editing.categories.map((category, index) => <div className="template-category-edit" key={category.id}><div className="builder-category-head"><div className="order-controls"><button type="button" disabled={!index} onClick={() => updateStructure(reorder(editing.categories, index, -1))}>↑</button><button type="button" disabled={index === editing.categories.length - 1} onClick={() => updateStructure(reorder(editing.categories, index, 1))}>↓</button></div><input aria-label="Category name" value={category.name} onChange={(e) => updateStructure(editing.categories.map((c) => c.id === category.id ? { ...c, name: e.target.value } : c))} /><button type="button" className="remove-button" onClick={() => updateStructure(editing.categories.filter((c) => c.id !== category.id))}>Remove</button></div>{category.positions.map((position, pIndex) => <div className="builder-position" key={position.id}><div className="order-controls"><button type="button" disabled={!pIndex} onClick={() => updateStructure(editing.categories.map((c) => c.id === category.id ? { ...c, positions: reorder(c.positions, pIndex, -1) } : c))}>↑</button><button type="button" disabled={pIndex === category.positions.length - 1} onClick={() => updateStructure(editing.categories.map((c) => c.id === category.id ? { ...c, positions: reorder(c.positions, pIndex, 1) } : c))}>↓</button></div><input aria-label="Position name" value={position.name} onChange={(e) => updateStructure(editing.categories.map((c) => c.id === category.id ? { ...c, positions: c.positions.map((p) => p.id === position.id ? { ...p, name: e.target.value } : p) } : c))} /><label className="capacity-input">Capacity<input type="number" min="1" max="100" value={position.capacity} onChange={(e) => updateStructure(editing.categories.map((c) => c.id === category.id ? { ...c, positions: c.positions.map((p) => p.id === position.id ? { ...p, capacity: Number(e.target.value) } : p) } : c))} /></label><button type="button" className="remove-button" onClick={() => updateStructure(editing.categories.map((c) => c.id === category.id ? { ...c, positions: c.positions.filter((p) => p.id !== position.id) } : c))}>Remove</button></div>)}<button type="button" className="add-position" onClick={() => updateStructure(editing.categories.map((c) => c.id === category.id ? { ...c, positions: [...c.positions, { id: makeId(), name: '', capacity: 2, order: c.positions.length }] } : c))}>＋ Add position</button></div>)}<p className="template-edit-hint">Schedules copy this structure when created. Later edits to this template do not change those schedules.</p>{error && <p className="inline-error">{error}</p>}<button className="primary-button" disabled={pending}>{pending ? 'Saving…' : 'Save template'}</button></form></div>}
    {preview && <div className="admin-overlay nested-overlay"><section className="preview-panel"><button className="icon-button preview-close" onClick={() => setPreview(null)}>×</button><p className="eyebrow">TEMPLATE PREVIEW</p><h2>{preview.name}</h2><p>{preview.description}</p>{preview.categories.map((category) => <div className="preview-category" key={category.id}><h3>{category.name}</h3>{category.positions.map((position) => <div key={position.id}><span>{position.name}</span><small>{position.capacity} ushers</small></div>)}</div>)}<button className="primary-button" onClick={() => setPreview(null)}>Close preview</button></section></div>}
  </section></div>
}

function Roster({ scheduleId, actions, onClose }) {
  const data = useQuery(api.admin.roster, { scheduleId })
  const [addName, setAddName] = useState('')
  const [addPosition, setAddPosition] = useState('')
  const [editing, setEditing] = useState(null)
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)
  const positions = useMemo(() => data ? allPositions(data.schedule.categories) : [], [data])
  if (data === undefined) return <div className="admin-overlay"><div className="roster-panel loading-card">Loading roster…</div></div>
  if (!data) return null
  const signupsByPosition = (id) => data.signups.filter((s) => s.positionId === id)
  const exportCsv = () => { const rows = [['Service', data.schedule.title], ['Date', data.schedule.serviceDate], [], ['Category', 'Position', 'Capacity', 'Filled', 'Name']]; for (const category of data.schedule.categories) for (const p of category.positions) { const signups = signupsByPosition(p.id); for (const signup of signups.length ? signups : [null]) rows.push([category.name, p.name, p.capacity, signups.length, signup?.name || '']) } const csv = rows.map((row) => row.map((cell) => `"${String(cell ?? '').replaceAll('"', '""')}"`).join(',')).join('\n'); const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' })); a.download = `${data.schedule.serviceDate}-usher-roster.csv`; a.click(); URL.revokeObjectURL(a.href) }
  async function add(e) { e.preventDefault(); setPending(true); setError(''); try { await actions.addSignup({ scheduleId, name: addName, positionId: addPosition }); setAddName(''); setAddPosition('') } catch (err) { setError(err.message?.replace(/^Error: /, '') || 'Could not add sign-up.') } finally { setPending(false) } }
  async function saveEdit(e) { e.preventDefault(); setPending(true); setError(''); try { await actions.updateSignup({ id: editing._id, name: editing.name, positionId: editing.positionId }); setEditing(null) } catch (err) { setError(err.message?.replace(/^Error: /, '') || 'Could not update sign-up.') } finally { setPending(false) } }
  return <div className="admin-overlay"><section className="roster-panel" role="dialog" aria-modal="true"><header className="builder-header"><div><p className="eyebrow">SERVICE ROSTER</p><h2>{data.schedule.title}</h2><p>{dateLabel(data.schedule.serviceDate)} · {data.signups.length} unique sign-ups</p></div><button className="icon-button" onClick={onClose}>×</button></header><div className="roster-toolbar"><button className="secondary-button" onClick={() => window.print()}>Print roster</button><button className="secondary-button" onClick={exportCsv}>Export CSV</button></div>
    <div className="roster-groups">{data.schedule.categories.map((category) => <section className="roster-category" key={category.id}><h3>{category.name}</h3>{category.positions.map((position) => <div className="roster-position" key={position.id}><div><strong>{position.name}</strong><small>{signupsByPosition(position.id).length} of {position.capacity} filled · {Math.max(0, position.capacity - signupsByPosition(position.id).length)} open</small></div>{signupsByPosition(position.id).map((signup) => <div className="roster-person" key={signup._id}><span>{signup.name}</span><button onClick={() => setEditing({ ...signup })}>Edit / move</button><button className="remove-button" onClick={async () => { if (!confirm(`Remove ${signup.name} from the roster?`)) return; try { await actions.removeSignup({ id: signup._id }) } catch (e) { setError(e.message) } }}>Remove</button></div>)}</div>)}</section>)}</div>
    <form className="roster-add" onSubmit={add}><h3>Add a sign-up</h3><input value={addName} onChange={(e) => setAddName(e.target.value)} placeholder="Usher name" required maxLength={80} /><select value={addPosition} onChange={(e) => setAddPosition(e.target.value)} required><option value="">Choose a position</option>{positions.map((p) => <option key={p.id} value={p.id}>{p.categoryName} · {p.name}</option>)}</select><button className="primary-button" disabled={pending}>{pending ? 'Adding…' : 'Add usher'}</button></form>
    {error && <p className="inline-error" role="alert">{error}</p>}
    {editing && <div className="admin-overlay nested-overlay"><form className="template-form" onSubmit={saveEdit}><button type="button" className="icon-button template-close" onClick={() => setEditing(null)}>×</button><p className="eyebrow">ROSTER CHANGE</p><h2>Edit sign-up</h2><label>Usher name<input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} required /></label><label>Position<select value={editing.positionId} onChange={(e) => setEditing({ ...editing, positionId: e.target.value })}>{positions.map((p) => <option key={p.id} value={p.id}>{p.categoryName} · {p.name}</option>)}</select></label>{error && <p className="inline-error">{error}</p>}<button className="primary-button" disabled={pending}>Save roster change</button></form></div>}
  </section></div>
}

function GoToHomeEditor() {
  useEffect(() => { window.location.replace('/?edit=homepage') }, [])
  return <p className="dashboard-loading" role="status">Opening home page editor...</p>
}

function Dashboard() {
  const admin = useQuery(api.admin.me)
  const schedules = useQuery(api.admin.dashboard, admin ? {} : 'skip')
  const templates = useQuery(api.admin.templates, admin ? {} : 'skip')
  const actions = useActions()
  const { signOut } = useAuthActions()
  const [editor, setEditor] = useState(null)
  const [showTemplates, setShowTemplates] = useState(false)
  const [rosterId, setRosterId] = useState(null)
  const [toast, setToast] = useState('')
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('upcoming')
  const notify = (message) => { setToast(message); setTimeout(() => setToast(''), 3500) }
  const share = (schedule) => `${location.origin}/s/${schedule.publicId}`
  async function copy(text, message) { try { await navigator.clipboard.writeText(text); notify(message) } catch { window.prompt('Copy this text:', text) } }
  function useTemplate(template) { setShowTemplates(false); setEditor({ ...initialForm(), sourceTemplateId: template._id, title: template.name, categories: JSON.parse(JSON.stringify(template.categories)) }) }
  const visible = (schedules || []).filter((s) => filter === 'all' || (filter === 'upcoming' ? s.serviceDate >= new Date().toISOString().slice(0, 10) && s.status !== 'completed' && s.status !== 'unpublished' : filter === s.status))
  if (admin === undefined || (admin && (schedules === undefined || templates === undefined))) return <div className="dashboard-loading">Preparing your team dashboard…</div>
  if (!admin) return <section className="admin-panel"><p className="eyebrow">ADMINISTRATOR</p><h2>Admin access required</h2><p>This signed-in account does not have administrator access.</p><button className="button" onClick={() => signOut()}>Sign out</button></section>
  return <section className="admin-dashboard"><header className="dashboard-top"><a className="brand" href="/"><img className="brand-logo" src="/utica-logo.jpeg" alt="" />Usher Sign Up</a><div className="dashboard-user"><span className="admin-avatar">{admin.username.slice(0, 1).toUpperCase()}</span><span>{admin.username}</span><button onClick={() => signOut()}>Sign out</button></div></header>
    <div className="dashboard-content"><section className="dashboard-welcome"><div><p className="eyebrow">TEAM LEADER WORKSPACE</p><h1>Good to see you, {admin.username}.</h1><p>Set up the next service and make it easy for everyone to find their place.</p></div><div className="dashboard-quick"><button className="secondary-button" onClick={() => window.location.assign('/?edit=homepage')}>Edit home page</button><button className="primary-button" onClick={() => setEditor(initialForm())}>＋ Create schedule</button><button className="secondary-button" onClick={() => setShowTemplates(true)}>Manage templates</button></div></section>
      <div className="summary-cards"><article><span>Upcoming services</span><strong>{schedules.filter((s) => s.serviceDate >= new Date().toISOString().slice(0, 10) && s.status !== 'completed' && s.status !== 'unpublished').length}</strong><small>Ready to organize</small></article><article><span>Published & open</span><strong>{schedules.filter((s) => s.status === 'published').length}</strong><small>Accepting sign-ups</small></article><article><span>Reusable templates</span><strong>{templates.length}</strong><small>For your weekly routine</small></article></div>
      <section className="schedule-manager"><div className="manager-heading"><div><p className="eyebrow">YOUR SERVICES</p><h2>Schedule overview</h2></div><select value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter schedules"><option value="upcoming">Upcoming</option><option value="draft">Drafts</option><option value="published">Published</option><option value="closed">Closed</option><option value="completed">Completed</option><option value="all">All schedules</option></select></div>
        {visible.length === 0 ? <div className="dashboard-empty"><span>✳</span><h3>No schedules here yet</h3><p>Create a blank schedule or start with one of your templates.</p><button className="primary-button" onClick={() => setEditor(initialForm())}>Create your first schedule</button></div> : <div className="schedule-cards">{visible.map((schedule) => <article className="schedule-admin-card" key={schedule._id}><div className="schedule-admin-main"><span className={`status-badge ${schedule.status}`}>{schedule.status}</span><h3>{schedule.title}</h3><p className="admin-date">{dateLabel(schedule.serviceDate)}{schedule.serviceTime ? ` · ${schedule.serviceTime}` : ''}</p><div className="schedule-metrics"><span><strong>{schedule.signupCount}</strong> sign-ups</span><span><strong>{schedule.openCount}</strong> positions need ushers</span><span><strong>{schedule.fullCount}</strong> full</span></div></div><div className="schedule-admin-actions">{schedule.status !== 'draft' && schedule.status !== 'unpublished' && <button className="secondary-button" onClick={() => window.open(share(schedule), '_blank', 'noopener')}>View public page ↗</button>}{schedule.status !== 'draft' && schedule.status !== 'unpublished' && <button className="secondary-button" onClick={() => copy(share(schedule), 'Public sign-up link copied')}>Copy sign-up link</button>}{schedule.status === 'published' && <button className="secondary-button" onClick={() => copy(`Hi everyone! Please sign up for ${schedule.title} on ${dateLabel(schedule.serviceDate)}. Open the link below to see the available positions and who has already signed up. Please choose one position for this service. Thank you!\n\n${share(schedule)}`, 'Announcement copied')}>Copy announcement</button>}<button className="secondary-button" onClick={() => setRosterId(schedule._id)}>Manage sign-ups · {schedule.signupCount}</button><button className="secondary-button" onClick={() => setEditor({ ...schedule, id: schedule._id })}>Edit schedule</button><div className="action-menu">{schedule.status === 'draft' && <button onClick={async () => { try { await actions.changeStatus({ id: schedule._id, status: 'published' }); notify('Schedule published') } catch (e) { setError(e.message) } }}>Publish</button>}{schedule.status === 'published' && <button onClick={async () => { try { await actions.changeStatus({ id: schedule._id, status: 'closed' }); notify('Sign-ups closed') } catch (e) { setError(e.message) } }}>Close sign-ups</button>}{schedule.status === 'closed' && <><button onClick={async () => { try { await actions.changeStatus({ id: schedule._id, status: 'published' }); notify('Sign-ups reopened') } catch (e) { setError(e.message) } }}>Reopen sign-ups</button><button onClick={async () => { try { await actions.changeStatus({ id: schedule._id, status: 'completed' }); notify('Schedule marked completed') } catch (e) { setError(e.message) } }}>Mark completed</button></>}{schedule.status !== 'unpublished' && <button onClick={async () => { if (!confirm('Unpublish this schedule? Its public link will stop working; its roster will be preserved.')) return; try { await actions.changeStatus({ id: schedule._id, status: 'unpublished' }); notify('Schedule unpublished') } catch (e) { setError(e.message) } }}>Unpublish</button>}<button onClick={async () => { try { await actions.duplicateSchedule({ id: schedule._id }); notify('Draft copy created') } catch (e) { setError(e.message) } }}>Duplicate</button><button onClick={async () => { if (!confirm(`Delete “${schedule.title}” and its ${schedule.signupCount} sign-ups? This cannot be undone.`)) return; try { await actions.deleteSchedule({ id: schedule._id }); notify('Schedule deleted') } catch (e) { setError(e.message) } }}>Delete…</button></div></div></article>)}</div>}
      </section>
    </div>{toast && <div className="toast" role="status">✓ {toast}</div>}{error && <div className="toast error-toast" role="alert">{error}<button onClick={() => setError('')}>×</button></div>}
    {editor && <Editor initial={editor} actions={actions} onClose={() => setEditor(null)} />}
    {showTemplates && <TemplateManager templates={templates} actions={actions} onClose={() => setShowTemplates(false)} onUseTemplate={useTemplate} />}
    {rosterId && <Roster scheduleId={rosterId} actions={actions} onClose={() => setRosterId(null)} />}
  </section>
}

function AdminContent() {
  const { isLoading, isAuthenticated } = useConvexAuth()
  const { signIn } = useAuthActions()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  if (isLoading) return <main className="admin-entry-page"><section className="admin-panel"><p role="status">Checking sign-in…</p></section></main>
  if (isAuthenticated) return new URLSearchParams(window.location.search).get('edit') === 'homepage' ? <GoToHomeEditor /> : <Dashboard />
  async function submit(event) { event.preventDefault(); if (pending) return; const form = event.currentTarget; const values = new FormData(form); setPending(true); setError(''); try { await signIn('password', { email: values.get('username'), password: values.get('password'), flow: 'signIn' }); form.reset() } catch { setError('Unable to sign in. Check your username and password, or try again later.') } finally { setPending(false) } }
  return <main className="admin-entry-page"><section className="admin-panel" aria-labelledby="admin-title"><a className="admin-back-link" href="/">← Back to home</a><p className="eyebrow">FOR THE TEAM LEADER</p><h2 id="admin-title">Admin sign-in</h2><p>Visitors don’t need an account. This sign-in is for the website administrator.</p><form onSubmit={submit}><label htmlFor="admin-username">Username</label><input id="admin-username" name="username" autoComplete="username" required maxLength={100} /><label htmlFor="admin-password">Password</label><input id="admin-password" name="password" type="password" autoComplete="current-password" required maxLength={256} />{error && <p className="admin-error" role="alert">{error}</p>}<button className="button" type="submit" disabled={pending}>{pending ? 'Signing in…' : 'Sign in'}</button></form></section></main>
}

class AdminErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return <main className="admin-entry-page"><section className="admin-panel admin-load-error"><p className="eyebrow">ADMIN DASHBOARD</p><h2>We couldn’t load your schedules.</h2><p>The Convex deployment connected to this app is missing dashboard functions. Deploy the latest Convex backend code, then reload this page.</p><button className="button" onClick={() => window.location.reload()}>Reload dashboard</button></section></main>
    }
    return this.props.children
  }
}

export default function Admin() {
  return <AdminErrorBoundary><AdminContent /></AdminErrorBoundary>
}
