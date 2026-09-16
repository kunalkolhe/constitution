import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resources & Links | BhartiyaSamvidhan',
  description: 'Official government links, documentaries, and reference materials to learn more about the Constitution of India.',
};

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
