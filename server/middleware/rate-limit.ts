import { createMiddleware } from 'hono/factory'

const requests = new Map<string, { count: number; resetAt: number }>()

export function rateLimit(maxRequests: number, windowMs: number) {
  return createMiddleware(async (c, next) => {
    const ip = c.req.header('x-forwarded-for') ?? c.req.header('x-real-ip') ?? 'unknown'
    const now = Date.now()

    const entry = requests.get(ip)
    if (!entry || now > entry.resetAt) {
      requests.set(ip, { count: 1, resetAt: now + windowMs })
      await next()
      return
    }

    if (entry.count >= maxRequests) {
      return c.json({ error: 'Too many requests. Please try again later.' }, 429)
    }

    entry.count++
    await next()
  })
}
