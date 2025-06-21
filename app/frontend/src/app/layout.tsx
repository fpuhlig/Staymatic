import type { Metadata } from 'next';
import './globals.css';
import { MainNavigation } from '../components/Navigation/MainNavigation';
import { Footer } from '../components';
import { UserProvider } from '../lib/user-context';

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
      <body className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
        <UserProvider>
          <MainNavigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
