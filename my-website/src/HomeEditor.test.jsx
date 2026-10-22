import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { homeDefaults } from '../../shared/homeContent'
import { LiveEditor } from './HomeEditor'
import HomePage, { HomeView } from './HomePage'

const mocks = vi.hoisted(() => ({ save: vi.fn(), upload: vi.fn(), discard: vi.fn(), auth: {}, page: null }))
vi.mock('convex/react', async () => {
  const { getFunctionName } = await import('convex/server')
  return {
    useMutation: ref => ({ 'homepage:save': mocks.save, 'homepage:uploadUrl': mocks.upload, 'homepage:discardUpload': mocks.discard })[getFunctionName(ref)],
    useQuery: () => mocks.page,
    useConvexAuth: () => mocks.auth,
  }
})
const initial = { content: homeDefaults, photoId: null, photoUrl: null, version: 0 }
beforeEach(() => {
  vi.resetAllMocks()
  mocks.auth = { isAuthenticated: true, isLoading: false }
  mocks.page = initial
  mocks.save.mockResolvedValue({ version: 1 })
  window.history.replaceState({}, '', '/')
})
afterEach(() => { cleanup(); vi.unstubAllGlobals() })

test('text changes in place, previews without inputs, and only publishes on Save', async () => {
  const user = userEvent.setup()
  render(<LiveEditor initial={initial} />)
  const headline = screen.getByRole('textbox', { name: 'Main headline' })
  await user.clear(headline)
  await user.type(headline, 'Welcome to Utica')
  expect(headline.value).toBe('Welcome to Utica')
  expect(mocks.save).not.toHaveBeenCalled()
  await user.click(screen.getByRole('button', { name: 'Preview' }))
  expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Welcome to Utica')
  expect(screen.queryByRole('textbox', { name: 'Main headline' })).toBeNull()
  await user.click(screen.getByRole('button', { name: 'Keep editing' }))
  expect(screen.getByRole('textbox', { name: 'Main headline' }).value).toBe('Welcome to Utica')
  await user.click(screen.getByRole('button', { name: 'Save & publish' }))
  await waitFor(() => expect(screen.getByRole('status').textContent).toBe('Changes published'))
  expect(mocks.save).toHaveBeenCalledWith({ content: { ...homeDefaults, heroTitle: 'Welcome to Utica' }, photoId: null, version: 0 })
  // Remain on the home page and use the new version for the next save.
  await user.type(screen.getByRole('textbox', { name: 'Main headline' }), '!')
  await user.click(screen.getByRole('button', { name: 'Save & publish' }))
  await waitFor(() => expect(mocks.save).toHaveBeenCalledTimes(2))
  expect(mocks.save.mock.calls[1][0].version).toBe(1)
})

test('failed publishing retains the draft for retry', async () => {
  mocks.save.mockRejectedValue(new Error('Another admin updated the home page.'))
  const user = userEvent.setup()
  render(<LiveEditor initial={initial} />)
  const address = screen.getByRole('textbox', { name: 'Footer address' })
  await user.clear(address)
  await user.type(address, 'Our new address')
  await user.click(screen.getByRole('button', { name: 'Save & publish' }))
  expect(await screen.findByRole('alert')).toHaveProperty('textContent', 'Another admin updated the home page.')
  expect(address.value).toBe('Our new address')
  expect(screen.getByRole('status').textContent).toBe('Unsaved changes')
})

test('saving again does not upload an already-published photo twice', async () => {
  const user = userEvent.setup()
  URL.createObjectURL = vi.fn(() => 'blob:preview')
  URL.revokeObjectURL = vi.fn()
  mocks.upload.mockResolvedValue('https://upload.invalid/test')
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ storageId: 'photo-new' }) }))
  render(<LiveEditor initial={initial} />)
  await user.upload(screen.getByLabelText('Upload portrait'), new File(['portrait'], 'usher.png', { type: 'image/png' }))
  await user.type(screen.getByLabelText('Photo description'), 'Featured usher portrait')
  await user.click(screen.getByRole('button', { name: 'Save & publish' }))
  await waitFor(() => expect(screen.getByRole('status').textContent).toBe('Changes published'))
  await user.type(screen.getByRole('textbox', { name: 'Footer church name' }), '!')
  await user.click(screen.getByRole('button', { name: 'Save & publish' }))
  await waitFor(() => expect(mocks.save).toHaveBeenCalledTimes(2))
  expect(mocks.upload).toHaveBeenCalledTimes(1)
  expect(mocks.save.mock.calls[1][0].photoId).toBe('photo-new')
})

test('visitors see ordinary public text and cannot open edit controls without sign-in', () => {
  const { unmount } = render(<HomeView content={homeDefaults} />)
  expect(screen.queryAllByRole('textbox')).toHaveLength(0)
  expect(screen.getByRole('link', { name: /Admin sign in/ }).getAttribute('href')).toBe('/admin')
  unmount()
  mocks.auth = { isAuthenticated: false, isLoading: false }
  window.history.replaceState({}, '', '/?edit=homepage')
  render(<HomePage backendConfigured />)
  expect(screen.getByRole('link', { name: 'Admin sign in' }).getAttribute('href')).toBe('/admin?edit=homepage')
  expect(screen.queryByRole('button', { name: 'Save & publish' })).toBeNull()
})
