import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { cors } from 'hono/cors'
import { strapi } from '@strapi/client'

const app = new Hono()

const cms = strapi({
  baseURL: `${process.env.STRAPI_URL}/api`,
  auth: process.env.STRAPI_TOKEN!,
})

app.use('/api/*', cors())

app.get('/api/gallery', async (c) => {
  const result = await cms.collection('galleries').find({ populate: ['image'] })
  const images = result.data.map((item: any) => {
    const img = Array.isArray(item.image) ? item.image[0] : item.image
    return {
      id: item.id,
      url: img?.url?.startsWith('http') ? img.url : `${process.env.STRAPI_URL}${img?.url}`,
      filename: img?.name ?? '',
    }
  })
  c.header('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400')
  return c.json(images)
})

app.get('/api/events', async (c) => {
  const result = await cms.collection('events').find({ sort: 'date:desc' })
  const events = result.data.map((item: any) => ({
    id: item.id,
    title: item.title,
    date: item.date,
    category: item.category,
    description: item.description,
  }))
  return c.json(events)
})

app.get('/api/schedule', async (c) => {
  const result = await cms.collection('schedule-days').find({ sort: 'order:asc' })
  const days = result.data.map((item: any) => ({
    id: item.id,
    day: item.day,
    event: item.event,
    time: item.time ?? null,
    order: item.order,
  }))
  c.header('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400')
  return c.json(days)
})

app.post('/api/reservations', async (c) => {
  const body = await c.req.json()
  try {
    await cms.collection('reservations').create(body)
    return c.json({ success: true })
  } catch (err: any) {
    return c.json({ error: err.message ?? 'Failed to create reservation' }, 400)
  }
})

if (process.env.NODE_ENV === 'production') {
  app.get('/*', serveStatic({ root: './dist' }))
  app.get('*', serveStatic({ path: './dist/index.html' }))
}

const port = parseInt(process.env.PORT || '3000')

export default {
  port,
  fetch: app.fetch,
}
