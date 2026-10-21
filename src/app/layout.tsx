import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mobitech Solution | Modern Mobile Tech Partner',
  description: 'Mobitech Solution builds digital products, mobile experiences, and security-first systems for modern businesses.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
