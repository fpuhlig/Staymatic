import { useSession } from '../lib/auth-client';
import { LoadingSpinner } from './LoadingSpinner';
import { PageContainer, PageHeader } from './common';
import { getContainerClasses } from './common/LayoutConstants';
import Link from 'next/link';
import { getButtonClasses } from './common/ButtonStyles';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { data: session, isPending: isSessionLoading } = useSession();
  const isAuthenticated = !!session?.user;

  if (isSessionLoading) {
    return (
      <div className={getContainerClasses()}>
        <LoadingSpinner message="Checking authentication..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <PageContainer maxWidth="dashboard">
        <PageHeader
          title="Please log in to continue"
          subtitle="You need to be logged in to access this page."
        />
        <div className="text-center">
          <Link href="/login" className={getButtonClasses('primary', 'lg')}>
            Log In
          </Link>
        </div>
      </PageContainer>
    );
  }

  return <>{children}</>;
};
