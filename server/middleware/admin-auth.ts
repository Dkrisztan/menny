import { createMiddleware } from 'hono/factory'
import { auth } from '../auth.ts'

export const adminAuth = createMiddleware(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers })
  if (!session?.user) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  await next()
})
