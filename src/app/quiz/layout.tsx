import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Civics Quiz | BhartiyaSamvidhan',
  description: 'Test your knowledge of the Indian Constitution with a fast-paced quiz — earn XP, build streaks, and see how much you really know.',
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
