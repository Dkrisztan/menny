import { Hono } from 'hono'
import { z } from 'zod'
import { getPresignedUploadUrl, getPublicUrl } from '../storage/minio.ts'

export const uploadRouter = new Hono()

const presignSchema = z.object({
  filename: z.string().min(1),
  contentType: z.string().min(1),
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
  const key = z.string().min(1).parse(body.key)
  const publicUrl = getPublicUrl(key)

  return c.json({ url: publicUrl })
})
