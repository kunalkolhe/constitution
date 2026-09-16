import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Emergency Provisions | BhartiyaSamvidhan',
  description: 'Learn about National, State, and Financial Emergencies under Articles 352, 356, and 360 of the Indian Constitution.',
};

export default function EmergencyProvisionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
