import { pgTable, uuid, text, integer, timestamp, boolean } from 'drizzle-orm/pg-core'

export const reservations = pgTable('reservations', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  partySize: integer('party_size').notNull(),
  description: text('description'),
  reservedFor: timestamp('reserved_for', { withTimezone: true }).notNull(),
  status: text('status').notNull().default('pending'),
  confirmed: boolean('confirmed').notNull().default(false),
  confirmToken: text('confirm_token').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})
