import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { cors } from 'hono/cors'
import { env } from './env.ts'
import { auth } from './auth.ts'
import { adminAuth } from './middleware/admin-auth.ts'
import { getObject } from './storage/minio.ts'
import { eventsRouter } from './routes/events.ts'
import { contactRouter } from './routes/contact.ts'
import { analyticsRouter } from './routes/analytics.ts'
import { uploadRouter } from './routes/upload.ts'
import { scheduleRouter } from './routes/schedule.ts'
import { galleryRouter } from './routes/gallery.ts'
import { reservationRouter } from './routes/reservations.ts'
import { settingsRouter } from './routes/settings.ts'

const admin = new Hono()

admin.use('/api/*', cors({
  origin: (origin) => {
    const allowed = [
      'http://localhost:5174',
      env.BETTER_AUTH_URL,
      env.ADMIN_URL,
    ]
    if (!origin || allowed.includes(origin)) return origin
    return null
  },
  credentials: true,
  allowHeaders: ['Content-Type', 'Authorization'],
}))

admin.on(['POST', 'GET'], '/api/auth/*', (c) => auth.handler(c.req.raw))

admin.use('/api/upload/*', adminAuth)
admin.route('/api/upload', uploadRouter)

admin.route('/api/events', eventsRouter)
admin.route('/api/contact', contactRouter)
admin.route('/api/analytics', analyticsRouter)
admin.route('/api/schedule', scheduleRouter)
admin.route('/api/gallery', galleryRouter)
admin.route('/api/reservations', reservationRouter)
admin.route('/api/settings', settingsRouter)

admin.get('/uploads/:key', async (c) => {
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
  admin.get('/*', serveStatic({ root: './dist-admin' }))
  admin.get('*', serveStatic({ path: './dist-admin/index.html' }))
}

export function startAdminServer() {
  Bun.serve({
    port: env.ADMIN_PORT,
    fetch: admin.fetch,
  })
  console.log(`Admin server: http://localhost:${env.ADMIN_PORT}`)
}
