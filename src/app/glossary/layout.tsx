import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Constitution Glossary | BhartiyaSamvidhan',
  description: 'An A-Z dictionary of constitutional and legal terms like Habeas Corpus, Mandamus, and Secularism, explained in plain language.',
};

export default function GlossaryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
