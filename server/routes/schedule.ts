import { Hono } from 'hono'
import { z } from 'zod'
import { db } from '../db/index.ts'
import { weeklySchedule } from '../db/schema/index.ts'
import { adminAuth } from '../middleware/admin-auth.ts'

export const scheduleRouter = new Hono()

const scheduleItemSchema = z.object({
  dayOfWeek: z.number().min(0).max(6),
  eventName: z.string().min(1),
  time: z.string().nullable(),
})

scheduleRouter.get('/', async (c) => {
  const items = await db.select().from(weeklySchedule).orderBy(weeklySchedule.dayOfWeek)
  return c.json(items)
})

scheduleRouter.put('/', adminAuth, async (c) => {
  const body = await c.req.json()
  const parsed = z.array(scheduleItemSchema).safeParse(body)

  if (!parsed.success) {
    return c.json({ error: parsed.error.flatten() }, 400)
  }

  await db.delete(weeklySchedule)

  if (parsed.data.length > 0) {
    await db.insert(weeklySchedule).values(
      parsed.data.map((item) => ({
        dayOfWeek: item.dayOfWeek,
        eventName: item.eventName,
        time: item.time,
      })),
    )
  }

  const items = await db.select().from(weeklySchedule).orderBy(weeklySchedule.dayOfWeek)
  return c.json(items)
})
