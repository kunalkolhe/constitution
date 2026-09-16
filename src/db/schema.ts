import { pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core';

// One row per anonymous device (see src/lib/deviceId.ts) — there's no real
// login system yet, so this is scoped to "this browser," not "this person."
// A real account system later would let this follow a person across devices
// instead; this is the minimum needed to survive a cleared browser cache.
export const progress = pgTable('progress', {
  deviceId: text('device_id').primaryKey(),
  bestXp: integer('best_xp').notNull().default(0),
  bestStreak: integer('best_streak').notNull().default(0),
  quizzesCompleted: integer('quizzes_completed').notNull().default(0),
  language: text('language'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type Progress = typeof progress.$inferSelect;
