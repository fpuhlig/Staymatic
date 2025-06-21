import { getHeadingClasses, getCardClasses } from './StyleUtilities';
import { LAYOUT_CONSTANTS } from './LayoutConstants';

interface FeatureCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const FeatureCard = ({ title, children, className = '' }: FeatureCardProps) => {
  return (
    <div className={`${getCardClasses('bordered')} ${LAYOUT_CONSTANTS.PADDING.card} ${className}`}>
      <h3 className={`mb-3 ${getHeadingClasses('h3')}`}>{title}</h3>
      {children}
    </div>
  );
};
