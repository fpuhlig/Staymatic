import { ReactNode } from 'react';
import { getContainerClasses, LAYOUT_CONSTANTS } from './LayoutConstants';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: keyof typeof LAYOUT_CONSTANTS.MAX_WIDTH;
}

export const PageContainer = ({
  children,
  className = '',
  maxWidth = '7xl',
}: PageContainerProps) => {
  return <main className={`${getContainerClasses(maxWidth)} ${className}`}>{children}</main>;
};
