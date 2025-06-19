import { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export const PageContainer = ({ children, className = '' }: PageContainerProps) => {
  return (
    <main className={`mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 ${className}`}>
      {children}
    </main>
  );
};
