import { ConvexHttpClient } from 'convex/browser'
import { api } from '../../../convex/_generated/api.js'

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]))

export default async function handler(request, response) {
  const origin = `https://${request.headers.host}`
  const publicId = request.query.publicId
  let title = 'Usher Sign Up | A Welcome for Everyone'
  let description = 'See available usher positions and sign up to serve.'

  try {
    const deploymentUrl = process.env.CONVEX_URL || process.env.VITE_CONVEX_URL
    if (deploymentUrl && typeof publicId === 'string' && publicId.length <= 100) {
      const client = new ConvexHttpClient(deploymentUrl)
      const schedule = await client.query(api.public.schedule, { publicId })
      if (schedule) {
        title = `${schedule.title} | Usher Sign Up`
        description = `Sign up to serve for ${schedule.title} on ${schedule.serviceDate}. See available positions and who is already serving.`
      }
    }
  } catch (error) {
    console.error('Unable to load schedule metadata for link preview', error)
  }

  try {
    const pageResponse = await fetch(`${origin}/index.html`)
    if (!pageResponse.ok) throw new Error('Unable to load the application page')
    let html = await pageResponse.text()
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`)
    html = html.replace('</head>', `<meta property="og:title" content="${escapeHtml(title)}" />
      <meta property="og:description" content="${escapeHtml(description)}" />
      <meta property="og:url" content="${escapeHtml(`${origin}/s/${encodeURIComponent(publicId || '')}`)}" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="${origin}/downstairs-aisles.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="${escapeHtml(title)}" />
      <meta name="twitter:description" content="${escapeHtml(description)}" />
      <meta name="twitter:image" content="${origin}/downstairs-aisles.png" />
    </head>`)
    response.setHeader('Content-Type', 'text/html; charset=utf-8')
    response.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
    response.status(200).send(html)
  } catch {
    response.status(502).send('Unable to load the schedule page right now. Please try again.')
  }
}
