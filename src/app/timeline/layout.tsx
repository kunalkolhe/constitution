import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Constitutional Timeline | BhartiyaSamvidhan',
  description: "From the 1928 Nehru Report to the 2023 Women's Reservation Bill — the evolution of India's Constitution.",
};

export default function TimelineLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
