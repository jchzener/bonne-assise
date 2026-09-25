import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bonne Assise — Discover Benin',
  description: 'A new way to discover Benin through places, stories and journeys.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
