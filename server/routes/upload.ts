import { Hono } from 'hono'
import { z } from 'zod'
import { db } from '../db/index.ts'
import { images } from '../db/schema/index.ts'
import { getPresignedUploadUrl, getPublicUrl } from '../storage/minio.ts'

export const uploadRouter = new Hono()

const presignSchema = z.object({
  filename: z.string().min(1),
  contentType: z.string().min(1),
})

const confirmSchema = z.object({
  key: z.string().min(1),
  filename: z.string().min(1),
  mimeType: z.string().min(1),
  size: z.number().int().positive(),
})

uploadRouter.post('/presign', async (c) => {
  const body = await c.req.json()
  const parsed = presignSchema.safeParse(body)

  if (!parsed.success) {
    return c.json({ error: parsed.error.flatten() }, 400)
  }

  const key = `${Date.now()}-${parsed.data.filename}`
  const uploadUrl = await getPresignedUploadUrl(key, parsed.data.contentType)

  return c.json({ uploadUrl, key })
})

uploadRouter.post('/confirm', async (c) => {
  const body = await c.req.json()
  const parsed = confirmSchema.safeParse(body)

  if (!parsed.success) {
    return c.json({ error: parsed.error.flatten() }, 400)
  }

  const url = getPublicUrl(parsed.data.key)

  const [image] = await db.insert(images).values({
    key: parsed.data.key,
    url,
    filename: parsed.data.filename,
    mimeType: parsed.data.mimeType,
    size: parsed.data.size,
  }).returning()

  return c.json(image)
})
