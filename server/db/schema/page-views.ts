import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core'

export const pageViews = pgTable('page_views', {
  id: serial('id').primaryKey(),
  path: text('path').notNull(),
  referrer: text('referrer'),
  userAgent: text('user_agent'),
  screenWidth: integer('screen_width'),
  sessionId: text('session_id').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})
