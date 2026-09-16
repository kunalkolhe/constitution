import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Making of the Constitution | BhartiyaSamvidhan',
  description: "The story of how India's Constitution was drafted — from the Constituent Assembly's first meeting to Republic Day.",
};

export default function HistoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
