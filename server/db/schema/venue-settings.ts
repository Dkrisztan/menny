import { pgTable, integer, timestamp } from 'drizzle-orm/pg-core'

export const venueSettings = pgTable('venue_settings', {
  id: integer('id').primaryKey().default(1),
  totalSeats: integer('total_seats').notNull().default(0),
  totalTables: integer('total_tables').notNull().default(0),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})
