import Link from 'next/link';
import { LAYOUT_CONSTANTS } from '../../../shared/src/constants';
import { getButtonClasses } from './common/ButtonStyles';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export const EmptyState = ({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
}: EmptyStateProps) => {
  const hasAction = actionLabel && (actionHref || onAction);

  return (
    <div className={`text-center ${LAYOUT_CONSTANTS.PADDING.section}`}>
      <div className="mx-auto mb-4 h-12 w-12 text-gray-400">{icon}</div>
      <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">{title}</h3>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>

      {hasAction && (
        <div className="mt-6">
          {actionHref ? (
            <Link href={actionHref} className={getButtonClasses('primary', 'md')}>
              {actionLabel}
            </Link>
          ) : (
            <button onClick={onAction} className={getButtonClasses('primary', 'md')}>
              {actionLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
