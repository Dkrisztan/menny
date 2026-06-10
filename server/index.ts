import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { env } from './env.ts'
import { eventsRouter } from './routes/events.ts'
import { contactRouter } from './routes/contact.ts'
import { analyticsRouter } from './routes/analytics.ts'
import { uploadRouter } from './routes/upload.ts'

const app = new Hono()

app.route('/api/events', eventsRouter)
app.route('/api/contact', contactRouter)
app.route('/api/analytics', analyticsRouter)
app.route('/api/upload', uploadRouter)

if (process.env.NODE_ENV === 'production') {
  app.use('/*', serveStatic({ root: './dist' }))
  app.get('*', serveStatic({ path: './dist/index.html' }))
}

export default {
  port: env.PORT,
  fetch: app.fetch,
}
