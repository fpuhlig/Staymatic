import { useSession } from '../lib/auth-client';
import { LoadingSpinner } from './LoadingSpinner';
import Link from 'next/link';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
  loadingMessage?: string;
  unauthorizedTitle?: string;
  unauthorizedDescription?: string;
}

export const AuthGuard = ({
  children,
  requireAuth = true,
  redirectTo = '/login',
  loadingMessage = 'Checking authentication...',
  unauthorizedTitle = 'Please log in to continue',
  unauthorizedDescription = 'You need to be logged in to access this page.',
}: AuthGuardProps) => {
  const { data: session, isPending: isSessionLoading } = useSession();
  const isAuthenticated = !!session?.user;

  // Show loading until session is checked
  if (isSessionLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <LoadingSpinner message={loadingMessage} />
      </div>
    );
  }

  // If auth is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          {unauthorizedTitle}
        </h1>
        <p className="mb-6 text-gray-600 dark:text-gray-400">{unauthorizedDescription}</p>
        <Link
          href={redirectTo}
          className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Log In
        </Link>
      </div>
    );
  }

  // If auth is not required or user is authenticated, render children
  return <>{children}</>;
};
