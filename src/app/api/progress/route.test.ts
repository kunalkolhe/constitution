import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import { GET, POST } from './route';

// This suite deliberately runs with no DATABASE_URL set — the same state
// this project is actually in right now — to prove the "no database
// configured" path responds gracefully (200, not a crash) rather than
// only being reasoned about.
describe('/api/progress (no DATABASE_URL configured)', () => {
  it('GET reports configured: false instead of erroring', async () => {
    const req = new NextRequest('http://localhost/api/progress?deviceId=abc');
    const res = await GET(req);

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ configured: false });
  });

  it('POST reports configured: false, saved: false instead of erroring', async () => {
    const req = new NextRequest('http://localhost/api/progress', {
      method: 'POST',
      body: JSON.stringify({ deviceId: 'abc', xp: 40, streak: 5 }),
    });
    const res = await POST(req);

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ configured: false, saved: false });
  });
});
