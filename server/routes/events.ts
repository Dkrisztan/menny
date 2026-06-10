import { Hono } from 'hono'
import { z } from 'zod'
import { eq, desc, gte, lt } from 'drizzle-orm'
import { db } from '../db/index.ts'
import { events } from '../db/schema/index.ts'

export const eventsRouter = new Hono()

const createEventSchema = z.object({
  title: z.string().min(1),
  date: z.string().datetime(),
  category: z.string().min(1),
  description: z.string().optional(),
  imageUrl: z.string().url().optional(),
})

const updateEventSchema = createEventSchema.partial()

eventsRouter.get('/', async (c) => {
  const category = c.req.query('category')
  const type = c.req.query('type')
  const now = new Date()

  let query = db.select().from(events).orderBy(desc(events.date)).$dynamic()

  if (category) {
    query = query.where(eq(events.category, category))
  }

  if (type === 'upcoming') {
    query = query.where(gte(events.date, now))
  } else if (type === 'archive') {
    query = query.where(lt(events.date, now))
  }

  const result = await query
  return c.json(result)
})

eventsRouter.get('/:id', async (c) => {
  const id = c.req.param('id')
  const [event] = await db.select().from(events).where(eq(events.id, id))

  if (!event) {
    return c.json({ error: 'Event not found' }, 404)
  }

  return c.json(event)
})

eventsRouter.post('/', async (c) => {
  const body = await c.req.json()
  const parsed = createEventSchema.safeParse(body)

  if (!parsed.success) {
    return c.json({ error: parsed.error.flatten() }, 400)
  }

  const [event] = await db
    .insert(events)
    .values({
      ...parsed.data,
      date: new Date(parsed.data.date),
    })
    .returning()

  return c.json(event, 201)
})

eventsRouter.put('/:id', async (c) => {
  const id = c.req.param('id')
  const body = await c.req.json()
  const parsed = updateEventSchema.safeParse(body)

  if (!parsed.success) {
    return c.json({ error: parsed.error.flatten() }, 400)
  }

  const values: Record<string, unknown> = { ...parsed.data, updatedAt: new Date() }
  if (parsed.data.date) {
    values.date = new Date(parsed.data.date)
  }

  const [event] = await db
    .update(events)
    .set(values)
    .where(eq(events.id, id))
    .returning()

  if (!event) {
    return c.json({ error: 'Event not found' }, 404)
  }

  return c.json(event)
})

eventsRouter.delete('/:id', async (c) => {
  const id = c.req.param('id')
  const [event] = await db.delete(events).where(eq(events.id, id)).returning()

  if (!event) {
    return c.json({ error: 'Event not found' }, 404)
  }

  return c.json({ success: true })
})
