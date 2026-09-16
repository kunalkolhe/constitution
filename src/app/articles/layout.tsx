import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All 448 Articles | BhartiyaSamvidhan',
  description: 'A complete, plain-English guide to all 25 Parts and the most important individual articles of the Indian Constitution.',
};

export default function ArticlesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
