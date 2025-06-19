import Link from 'next/link';
import { LAYOUT_CONSTANTS, getContainerClasses } from './common/LayoutConstants';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  backLink?: {
    href: string;
    label: string;
  };
  maxWidth?: keyof typeof LAYOUT_CONSTANTS.MAX_WIDTH;
  showBackButton?: boolean;
  hideTitle?: boolean;
}

export const PageLayout = ({
  children,
  title,
  description,
  backLink,
  maxWidth = '7xl',
  showBackButton = false,
  hideTitle = false,
}: PageLayoutProps) => {
  return (
    <main className={getContainerClasses(maxWidth)}>
      {/* Header */}
      <div className={LAYOUT_CONSTANTS.MARGIN.header}>
        {(showBackButton || backLink) && (
          <div className={LAYOUT_CONSTANTS.MARGIN.small}>
            <Link
              href={backLink?.href || '/'}
              className="flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              <svg className="mr-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              {backLink?.label || 'Back'}
            </Link>
          </div>
        )}
        {!hideTitle && (
          <h1 className={`${LAYOUT_CONSTANTS.TYPOGRAPHY.h1} text-gray-900 dark:text-white`}>
            {title}
          </h1>
        )}
        {description && (
          <p className={`mt-2 ${LAYOUT_CONSTANTS.TYPOGRAPHY.subtitle}`}>{description}</p>
        )}
      </div>

      {children}
    </main>
  );
};
