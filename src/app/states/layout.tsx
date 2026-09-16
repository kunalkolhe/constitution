import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'States & Union Territories | BhartiyaSamvidhan',
  description: "An interactive map of India's 28 states and 8 union territories, with constitutional details for each.",
};

export default function StatesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
