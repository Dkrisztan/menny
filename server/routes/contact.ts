import { Hono } from 'hono'
import { z } from 'zod'
import { db } from '../db/index.ts'
import { contactSubmissions } from '../db/schema/index.ts'
import { sendContactEmail, sendBookingEmail } from '../email/client.ts'

export const contactRouter = new Hono()

const contactSchema = z.object({
  type: z.enum(['contact', 'szervezz', 'privat']),
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
  metadata: z.record(z.string(), z.unknown()).optional(),
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
