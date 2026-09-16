import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Explore the Constitution | BhartiyaSamvidhan',
  description: 'A complete directory of constitutional concepts, rights, duties, amendments, and government bodies — all in one place.',
};

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
