import { ReactNode } from 'react';
import { getContainerClasses, LAYOUT_CONSTANTS } from './LayoutConstants';

interface AuthPageLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export const AuthPageLayout = ({ children, title, subtitle }: AuthPageLayoutProps) => {
  return (
    <div className={getContainerClasses()}>
      <div className="flex min-h-[calc(100vh-16rem)] items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className={`${LAYOUT_CONSTANTS.TYPOGRAPHY.h1} text-gray-900 dark:text-white`}>
              {title}
            </h1>
            <p className={`mt-2 text-sm ${LAYOUT_CONSTANTS.TYPOGRAPHY.subtitle}`}>{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
