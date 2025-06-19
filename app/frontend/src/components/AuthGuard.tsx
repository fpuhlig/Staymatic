import { useSession } from '../lib/auth-client';
import { LoadingSpinner } from './LoadingSpinner';
import { getContainerClasses, LAYOUT_CONSTANTS } from './common/LayoutConstants';
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
      <div className={getContainerClasses()}>
        <LoadingSpinner message={loadingMessage} />
      </div>
    );
  }

  // If auth is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return (
      <div className={`${getContainerClasses('2xl')} text-center`}>
        <h1
          className={`${LAYOUT_CONSTANTS.MARGIN.small} ${LAYOUT_CONSTANTS.TYPOGRAPHY.h2} text-gray-900 dark:text-white`}
        >
          {unauthorizedTitle}
        </h1>
        <p className={`${LAYOUT_CONSTANTS.MARGIN.element} ${LAYOUT_CONSTANTS.TYPOGRAPHY.subtitle}`}>
          {unauthorizedDescription}
        </p>
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
