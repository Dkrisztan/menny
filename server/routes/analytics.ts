import { Hono } from 'hono'
import { z } from 'zod'
import { sql, desc } from 'drizzle-orm'
import { db } from '../db/index.ts'
import { pageViews } from '../db/schema/index.ts'
import { adminAuth } from '../middleware/admin-auth.ts'

export const analyticsRouter = new Hono()

const trackSchema = z.object({
  path: z.string().min(1),
  referrer: z.string().optional(),
  screenWidth: z.number().optional(),
})

analyticsRouter.post('/track', async (c) => {
  const body = await c.req.json()
  const parsed = trackSchema.safeParse(body)

  if (!parsed.success) {
    return c.json({ error: 'Invalid payload' }, 400)
  }

  const userAgent = c.req.header('user-agent') ?? null
  let sessionId = getCookie(c, 'sid')

  if (!sessionId) {
    sessionId = crypto.randomUUID()
    c.header('Set-Cookie', `sid=${sessionId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`)
  }

  await db.insert(pageViews).values({
    path: parsed.data.path,
    referrer: parsed.data.referrer ?? null,
    userAgent,
    screenWidth: parsed.data.screenWidth ?? null,
    sessionId,
  })

  return c.json({ success: true })
})

analyticsRouter.get('/summary', adminAuth, async (c) => {
  const days = Number(c.req.query('days') ?? '30')
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()

  const [totals] = await db
    .select({
      totalViews: sql<number>`count(*)`,
      uniqueSessions: sql<number>`count(distinct ${pageViews.sessionId})`,
    })
    .from(pageViews)
    .where(sql`${pageViews.createdAt} >= ${since}`)

  const topPages = await db
    .select({
      path: pageViews.path,
      views: sql<number>`count(*)`,
    })
    .from(pageViews)
    .where(sql`${pageViews.createdAt} >= ${since}`)
    .groupBy(pageViews.path)
    .orderBy(desc(sql`count(*)`))
    .limit(10)

  const dailyViews = await db
    .select({
      date: sql<string>`date(${pageViews.createdAt})`,
      views: sql<number>`count(*)`,
    })
    .from(pageViews)
    .where(sql`${pageViews.createdAt} >= ${since}`)
    .groupBy(sql`date(${pageViews.createdAt})`)
    .orderBy(sql`date(${pageViews.createdAt})`)

  return c.json({
    totals,
    topPages,
    dailyViews,
  })
})

function getCookie(c: { req: { header: (name: string) => string | undefined } }, name: string): string | null {
  const cookies = c.req.header('cookie')
  if (!cookies) return null
  const match = cookies.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return match ? match[1] : null
}
