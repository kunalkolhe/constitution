import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Directive Principles of State Policy | BhartiyaSamvidhan',
  description: 'Understand the Socialist, Gandhian, and Liberal-Intellectual principles that guide the Indian government in policy-making.',
};

export default function DirectivePrinciplesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
