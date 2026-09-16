import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fundamental Duties | BhartiyaSamvidhan',
  description: 'The 11 moral obligations of every Indian citizen under Article 51A, added by the 42nd Amendment.',
};

export default function FundamentalDutiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
