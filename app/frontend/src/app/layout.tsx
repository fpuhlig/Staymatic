import type { Metadata } from 'next';
import './globals.css';
import { MainNavigation } from '../components/Navigation/MainNavigation';
import { Footer } from '../components';

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
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <MainNavigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
