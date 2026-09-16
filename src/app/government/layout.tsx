import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Government Structure | BhartiyaSamvidhan',
  description: "How India's Legislature, Executive, and Judiciary work together — the three pillars of Indian democracy.",
};

export default function GovernmentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
