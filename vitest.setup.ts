import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Nearly every page renders <Navbar /> (usePathname) and some use useRouter
// directly (e.g. the quiz's "Play Simulator" button) — next/navigation only
// works inside Next's real app runtime, so it needs a stand-in here.
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
}));
