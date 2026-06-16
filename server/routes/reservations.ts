import { Hono } from 'hono'
import { z } from 'zod'
import { eq, desc, and } from 'drizzle-orm'
import { db } from '../db/index.ts'
import { reservations } from '../db/schema/index.ts'
import { adminAuth } from '../middleware/admin-auth.ts'
import { rateLimit } from '../middleware/rate-limit.ts'
import { sendReservationConfirmEmail, sendReservationAcceptedEmail, sendReservationDeclinedEmail } from '../email/client.ts'
import { env } from '../env.ts'

export const reservationRouter = new Hono()

const createSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  partySize: z.number().int().min(1).max(30),
  description: z.string().max(500).optional(),
  reservedFor: z.string().datetime(),
})

const updateStatusSchema = z.object({
  status: z.enum(['accepted', 'declined']),
  reason: z.string().max(500).optional(),
})

// Public: create reservation (rate limited: 5 per hour per IP)
reservationRouter.post('/', rateLimit(5, 60 * 60 * 1000), async (c) => {
  const body = await c.req.json()
  const parsed = createSchema.safeParse(body)

  if (!parsed.success) {
    return c.json({ error: parsed.error.flatten() }, 400)
  }

  // Email cooldown: reject if this email already has a pending unconfirmed reservation
  const [existing] = await db
    .select({ id: reservations.id })
    .from(reservations)
    .where(
      and(
        eq(reservations.email, parsed.data.email),
        eq(reservations.confirmed, false),
      ),
    )
    .limit(1)

  if (existing) {
    return c.json({ error: 'You already have a pending reservation. Please confirm it via email first.' }, 429)
  }

  const confirmToken = crypto.randomUUID()

  await db.insert(reservations).values({
    name: parsed.data.name,
    email: parsed.data.email,
    partySize: parsed.data.partySize,
    description: parsed.data.description ?? null,
    reservedFor: new Date(parsed.data.reservedFor),
    status: 'pending',
    confirmed: false,
    confirmToken,
  })

  const confirmUrl = `${env.BETTER_AUTH_URL}/api/reservations/confirm/${confirmToken}`

  await sendReservationConfirmEmail({
    name: parsed.data.name,
    email: parsed.data.email,
    partySize: parsed.data.partySize,
    reservedFor: parsed.data.reservedFor,
    confirmUrl,
  }).catch(() => {})

  return c.json({ success: true, message: 'Reservation created. Please check your email to confirm.' }, 201)
})

// Public: confirm reservation via email link
reservationRouter.get('/confirm/:token', async (c) => {
  const token = c.req.param('token')

  const [reservation] = await db
    .update(reservations)
    .set({ confirmed: true })
    .where(and(eq(reservations.confirmToken, token), eq(reservations.confirmed, false)))
    .returning()

  if (!reservation) {
    return c.html('<html><body style="font-family:sans-serif;text-align:center;padding:60px"><h1>Link expired or already used</h1><p>This confirmation link is no longer valid.</p></body></html>')
  }

  return c.html('<html><body style="font-family:sans-serif;text-align:center;padding:60px"><h1>Reservation confirmed!</h1><p>Your reservation has been submitted. We will get back to you shortly.</p></body></html>')
})

// Admin: list confirmed reservations only
reservationRouter.get('/', adminAuth, async (c) => {
  const results = await db
    .select()
    .from(reservations)
    .where(eq(reservations.confirmed, true))
    .orderBy(desc(reservations.reservedFor))
  return c.json(results)
})

reservationRouter.get('/:id', adminAuth, async (c) => {
  const id = c.req.param('id')
  const [reservation] = await db.select().from(reservations).where(eq(reservations.id, id))
  if (!reservation) return c.json({ error: 'Not found' }, 404)
  return c.json(reservation)
})

reservationRouter.patch('/:id', adminAuth, async (c) => {
  const id = c.req.param('id')
  const body = await c.req.json()
  const parsed = updateStatusSchema.safeParse(body)

  if (!parsed.success) {
    return c.json({ error: parsed.error.flatten() }, 400)
  }

  const [reservation] = await db
    .update(reservations)
    .set({ status: parsed.data.status })
    .where(eq(reservations.id, id))
    .returning()

  if (!reservation) return c.json({ error: 'Not found' }, 404)

  if (parsed.data.status === 'accepted') {
    await sendReservationAcceptedEmail({
      name: reservation.name,
      email: reservation.email,
      partySize: reservation.partySize,
      reservedFor: reservation.reservedFor.toISOString(),
    }).catch(() => {})
  } else if (parsed.data.status === 'declined') {
    await sendReservationDeclinedEmail({
      name: reservation.name,
      email: reservation.email,
      partySize: reservation.partySize,
      reservedFor: reservation.reservedFor.toISOString(),
      reason: parsed.data.reason,
    }).catch(() => {})
  }

  return c.json(reservation)
})

reservationRouter.delete('/:id', adminAuth, async (c) => {
  const id = c.req.param('id')
  const [reservation] = await db.delete(reservations).where(eq(reservations.id, id)).returning()
  if (!reservation) return c.json({ error: 'Not found' }, 404)
  return c.json({ success: true })
})
