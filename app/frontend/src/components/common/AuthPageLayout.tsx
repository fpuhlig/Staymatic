import { getContainerClasses } from './LayoutConstants';
import { getHeadingClasses, getTextClasses } from './StyleUtilities';

interface AuthPageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const AuthPageLayout = ({ title, subtitle, children }: AuthPageLayoutProps) => {
  return (
    <div className={getContainerClasses()}>
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
          <div className="text-center">
            <h2 className={getHeadingClasses('h1')}>{title}</h2>
            {subtitle && <p className={getTextClasses('secondary')}>{subtitle}</p>}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
