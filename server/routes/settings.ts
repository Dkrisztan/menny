import { Hono } from 'hono'
import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { db } from '../db/index.ts'
import { venueSettings } from '../db/schema/index.ts'
import { adminAuth } from '../middleware/admin-auth.ts'

export const settingsRouter = new Hono()

const updateSchema = z.object({
  totalSeats: z.number().int().min(0),
  totalTables: z.number().int().min(0),
})

settingsRouter.get('/', adminAuth, async (c) => {
  const [settings] = await db.select().from(venueSettings).where(eq(venueSettings.id, 1))
  if (!settings) {
    const [created] = await db.insert(venueSettings).values({ id: 1, totalSeats: 0, totalTables: 0 }).returning()
    return c.json(created)
  }
  return c.json(settings)
})

settingsRouter.patch('/', adminAuth, async (c) => {
  const body = await c.req.json()
  const parsed = updateSchema.safeParse(body)

  if (!parsed.success) {
    return c.json({ error: parsed.error.flatten() }, 400)
  }

  const [settings] = await db
    .insert(venueSettings)
    .values({ id: 1, totalSeats: parsed.data.totalSeats, totalTables: parsed.data.totalTables })
    .onConflictDoUpdate({
      target: venueSettings.id,
      set: { totalSeats: parsed.data.totalSeats, totalTables: parsed.data.totalTables, updatedAt: new Date() },
    })
    .returning()

  return c.json(settings)
})
