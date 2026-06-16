import { pgTable, uuid, text, integer, timestamp } from 'drizzle-orm/pg-core'

export const images = pgTable('images', {
  id: uuid('id').defaultRandom().primaryKey(),
  key: text('key').notNull().unique(),
  url: text('url').notNull(),
  filename: text('filename').notNull(),
  mimeType: text('mime_type').notNull(),
  size: integer('size').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})
