import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'

const app = new Hono()

app.get('/*', serveStatic({ root: './dist' }))
app.get('*', serveStatic({ path: './dist/index.html' }))

const port = parseInt(process.env.PORT || '3000')

export default {
  port,
  fetch: app.fetch,
}
