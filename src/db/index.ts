import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Persistence is entirely optional and off by default. Without a real
// DATABASE_URL pointing at a provisioned Postgres instance (e.g. a free
// instance from Neon, Supabase, or Railway), `db` is null — every caller in
// this codebase (see src/app/api/progress/route.ts) checks for that and
// responds gracefully instead of crashing, so the app keeps working exactly
// as it did before, on localStorage alone, until a database is configured.
const connectionString = process.env.DATABASE_URL;

let dbInstance: ReturnType<typeof drizzle<typeof schema>> | null = null;

if (connectionString) {
  const client = postgres(connectionString, { max: 1 });
  dbInstance = drizzle(client, { schema });
}

export const db = dbInstance;
export const isDatabaseConfigured = db !== null;
