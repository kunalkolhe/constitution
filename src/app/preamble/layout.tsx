import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Preamble | BhartiyaSamvidhan',
  description: 'The soul of the Indian Constitution — explore the meaning behind Sovereign, Socialist, Secular, Democratic, and Republic.',
};

export default function PreambleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
