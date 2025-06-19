import { getPageHeaderClasses, LAYOUT_CONSTANTS } from './LayoutConstants';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const PageHeader = ({ title, subtitle, className = '' }: PageHeaderProps) => {
  return (
    <div className={`${getPageHeaderClasses()} ${className}`}>
      <h1
        className={`${LAYOUT_CONSTANTS.MARGIN.small} ${LAYOUT_CONSTANTS.TYPOGRAPHY.h1} text-gray-900 dark:text-white`}
      >
        {title}
      </h1>
      {subtitle && <p className={`text-xl ${LAYOUT_CONSTANTS.TYPOGRAPHY.subtitle}`}>{subtitle}</p>}
    </div>
  );
};
