import { pgTable, uuid, text, timestamp, jsonb } from 'drizzle-orm/pg-core'

export const contactSubmissions = pgTable('contact_submissions', {
  id: uuid('id').defaultRandom().primaryKey(),
  type: text('type').notNull().$type<'contact' | 'szervezz' | 'privat'>(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  message: text('message').notNull(),
  metadata: jsonb('metadata').$type<Record<string, unknown>>(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})
