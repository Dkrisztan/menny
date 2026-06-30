import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { cors } from 'hono/cors'
import { env } from './env.ts'
import { auth } from './auth.ts'
import { adminAuth } from './middleware/admin-auth.ts'
import { eventsRouter } from './routes/events.ts'
import { contactRouter } from './routes/contact.ts'
import { analyticsRouter } from './routes/analytics.ts'
import { uploadRouter } from './routes/upload.ts'
import { scheduleRouter } from './routes/schedule.ts'
import { galleryRouter } from './routes/gallery.ts'
import { reservationRouter } from './routes/reservations.ts'
import { settingsRouter } from './routes/settings.ts'
import { ensureBucket, getObject } from './storage/s3.ts'

const app = new Hono()

app.use('/api/*', cors({
  origin: (origin) => {
    const allowed = [
      'http://localhost:5174',
      'http://localhost:5173',
      env.BETTER_AUTH_URL,
    ]
    if (!origin || allowed.includes(origin)) return origin
    return null
  },
  credentials: true,
  allowHeaders: ['Content-Type', 'Authorization'],
}))

app.on(['POST', 'GET'], '/api/auth/*', (c) => auth.handler(c.req.raw))

app.use('/api/upload/*', adminAuth)
app.route('/api/upload', uploadRouter)

app.route('/api/events', eventsRouter)
app.route('/api/contact', contactRouter)
app.route('/api/analytics', analyticsRouter)
app.route('/api/schedule', scheduleRouter)
app.route('/api/gallery', galleryRouter)
app.route('/api/reservations', reservationRouter)
app.route('/api/settings', settingsRouter)

app.get('/uploads/:key', async (c) => {
  const key = c.req.param('key')
  try {
    const stream = await getObject(key)
    const ext = key.split('.').pop()?.toLowerCase()
    const mimeTypes: Record<string, string> = {
      jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png',
      gif: 'image/gif', webp: 'image/webp', svg: 'image/svg+xml',
    }
    c.header('Content-Type', mimeTypes[ext ?? ''] ?? 'application/octet-stream')
    c.header('Cache-Control', 'public, max-age=31536000, immutable')
    return c.body(stream as unknown as ReadableStream)
  } catch {
    return c.notFound()
  }
})

if (process.env.NODE_ENV === 'production') {
  app.get('/*', serveStatic({ root: './dist' }))
  app.get('*', serveStatic({ path: './dist/index.html' }))
}

ensureBucket().catch((err) => console.error('S3 bucket init failed:', err.message))

import { startAdminServer } from './admin.ts'
startAdminServer()

export default {
  port: env.PORT,
  fetch: app.fetch,
}
