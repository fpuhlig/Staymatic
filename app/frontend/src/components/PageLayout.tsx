import Link from 'next/link';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  backLink?: {
    href: string;
    label: string;
  };
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '7xl';
  showBackButton?: boolean;
  hideTitle?: boolean;
}

export const PageLayout = ({
  children,
  title,
  description,
  backLink,
  maxWidth = '3xl',
  showBackButton = false,
  hideTitle = false,
}: PageLayoutProps) => {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '7xl': 'max-w-7xl',
  };

  return (
    <main className={`mx-auto ${maxWidthClasses[maxWidth]} px-4 py-8 sm:px-6 sm:py-12 lg:px-8`}>
      {/* Header */}
      <div className="mb-8">
        {(showBackButton || backLink) && (
          <div className="mb-4 flex items-center gap-4">
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
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">{title}</h1>
        )}
        {description && <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>}
      </div>

      {children}
    </main>
  );
};
