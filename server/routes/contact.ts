import { Hono } from 'hono'
import { z } from 'zod'
import { eq, desc } from 'drizzle-orm'
import { db } from '../db/index.ts'
import { contactSubmissions } from '../db/schema/index.ts'
import { sendContactEmail, sendBookingEmail } from '../email/client.ts'
import { adminAuth } from '../middleware/admin-auth.ts'

export const contactRouter = new Hono()

const contactSchema = z.object({
  type: z.enum(['contact', 'szervezz', 'privat']),
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
  metadata: z.record(z.string(), z.unknown()).optional(),
})

contactRouter.get('/', adminAuth, async (c) => {
  const results = await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt))
  return c.json(results)
})

contactRouter.get('/:id', adminAuth, async (c) => {
  const id = c.req.param('id')
  const [submission] = await db.select().from(contactSubmissions).where(eq(contactSubmissions.id, id))
  if (!submission) return c.json({ error: 'Not found' }, 404)
  return c.json(submission)
})

contactRouter.delete('/:id', adminAuth, async (c) => {
  const id = c.req.param('id')
  const [submission] = await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id)).returning()
  if (!submission) return c.json({ error: 'Not found' }, 404)
  return c.json({ success: true })
})

contactRouter.post('/', async (c) => {
  const body = await c.req.json()
  const parsed = contactSchema.safeParse(body)

  if (!parsed.success) {
    return c.json({ error: parsed.error.flatten() }, 400)
  }

  const [submission] = await db
    .insert(contactSubmissions)
    .values(parsed.data)
    .returning()

  if (parsed.data.type === 'privat') {
    await sendBookingEmail(parsed.data)
  } else {
    await sendContactEmail(parsed.data)
  }

  return c.json({ success: true, id: submission.id }, 201)
})
