import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    // drizzle-kit reads this directly at CLI-run time (npm run db:push),
    // separate from src/db/index.ts's own runtime check — both need
    // DATABASE_URL set, but for different purposes (this one only runs
    // when you actually push schema changes, not on every app request).
    url: process.env.DATABASE_URL || '',
  },
});
