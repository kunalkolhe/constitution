import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fundamental Rights | BhartiyaSamvidhan',
  description: 'Your unbreakable shield as an Indian citizen — explore all 6 Fundamental Rights with real-life examples and landmark Supreme Court cases.',
};

export default function FundamentalRightsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
