import { pgTable, serial, integer, text, timestamp } from 'drizzle-orm/pg-core'

export const weeklySchedule = pgTable('weekly_schedule', {
  id: serial('id').primaryKey(),
  dayOfWeek: integer('day_of_week').notNull(),
  eventName: text('event_name').notNull(),
  time: text('time'),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})
