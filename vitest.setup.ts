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

// jsdom has no IntersectionObserver — framer-motion's useInView (used by
// Squiggle and scroll-reveal sections rendered on every page via Footer/
// FeatureCards) needs a stand-in or it throws on mount. Tests don't care
// about actual viewport intersection, so a no-op stub is enough.
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = () => [];
  root = null;
  rootMargin = '';
  thresholds: ReadonlyArray<number> = [];
}
vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
