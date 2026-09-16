import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rights Simulator | BhartiyaSamvidhan',
  description: 'Step into real-life scenarios and discover which fundamental right protects you in each situation.',
};

export default function SimulatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
