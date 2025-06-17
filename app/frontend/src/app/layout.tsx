import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Staymatic',
  description: 'Smart rental platform with AI-based travel recommendations.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
