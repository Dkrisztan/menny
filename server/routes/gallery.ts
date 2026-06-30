import { Hono } from 'hono'
import { eq, desc } from 'drizzle-orm'
import { db } from '../db/index.ts'
import { images } from '../db/schema/index.ts'
import { deleteObject } from '../storage/s3.ts'
import { adminAuth } from '../middleware/admin-auth.ts'

export const galleryRouter = new Hono()

galleryRouter.get('/', async (c) => {
  const results = await db.select().from(images).orderBy(desc(images.createdAt))
  c.header('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400')
  return c.json(results)
})

galleryRouter.delete('/:id', adminAuth, async (c) => {
  const id = c.req.param('id')
  const [image] = await db.select().from(images).where(eq(images.id, id))

  if (!image) {
    return c.json({ error: 'Not found' }, 404)
  }

  await deleteObject(image.key)
  await db.delete(images).where(eq(images.id, id))

  return c.json({ success: true })
})
