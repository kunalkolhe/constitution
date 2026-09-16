import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Constitutional Amendments | BhartiyaSamvidhan',
  description: 'Explore how the Indian Constitution is amended, from Simple Majority to landmark changes like the 42nd, 73rd, and 101st Amendments.',
};

export default function AmendmentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
