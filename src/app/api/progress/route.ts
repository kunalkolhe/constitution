import { NextRequest, NextResponse } from 'next/server';
import { db, isDatabaseConfigured } from '@/db';
import { progress } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';

// GET /api/progress?deviceId=xxx — fetch this device's saved best stats.
// Responds 200 with `configured: false` (not an error) when no database is
// set up, so client code can treat "not configured" and "no saved progress
// yet" the same way: just show nothing and carry on with localStorage.
export async function GET(request: NextRequest) {
  if (!db) {
    return NextResponse.json({ configured: false });
  }

  const deviceId = request.nextUrl.searchParams.get('deviceId');
  if (!deviceId) {
    return NextResponse.json({ error: 'deviceId is required' }, { status: 400 });
  }

  try {
    const [row] = await db.select().from(progress).where(eq(progress.deviceId, deviceId)).limit(1);
    return NextResponse.json({ configured: true, progress: row ?? null });
  } catch (error) {
    console.error('[api/progress] GET failed:', error);
    return NextResponse.json({ configured: true, error: 'Failed to read progress' }, { status: 500 });
  }
}

// POST /api/progress — upsert a device's best stats. Only ever raises the
// stored bestXp/bestStreak (never lowers them), and always increments
// quizzesCompleted by 1 — this endpoint is called once per finished quiz.
export async function POST(request: NextRequest) {
  if (!db) {
    return NextResponse.json({ configured: false, saved: false });
  }

  let body: { deviceId?: string; xp?: number; streak?: number; language?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { deviceId, xp, streak, language } = body;
  if (!deviceId || typeof xp !== 'number' || typeof streak !== 'number') {
    return NextResponse.json({ error: 'deviceId, xp, and streak are required' }, { status: 400 });
  }

  try {
    await db
      .insert(progress)
      .values({
        deviceId,
        bestXp: xp,
        bestStreak: streak,
        quizzesCompleted: 1,
        language: language ?? null,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: progress.deviceId,
        set: {
          bestXp: sql`GREATEST(${progress.bestXp}, ${xp})`,
          bestStreak: sql`GREATEST(${progress.bestStreak}, ${streak})`,
          quizzesCompleted: sql`${progress.quizzesCompleted} + 1`,
          language: language ?? sql`${progress.language}`,
          updatedAt: new Date(),
        },
      });

    return NextResponse.json({ configured: true, saved: true });
  } catch (error) {
    console.error('[api/progress] POST failed:', error);
    return NextResponse.json({ configured: true, saved: false, error: 'Failed to save progress' }, { status: 500 });
  }
}

// Only used by isDatabaseConfigured checks elsewhere if ever needed as a
// quick health check without a deviceId.
export async function HEAD() {
  return new NextResponse(null, { status: isDatabaseConfigured ? 200 : 204 });
}
