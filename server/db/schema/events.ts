import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core'

export const events = pgTable('events', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  date: timestamp('date', { withTimezone: true }).notNull(),
  category: text('category').notNull(),
  description: text('description'),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})
