import { LAYOUT_CONSTANTS } from '../../../shared/src/constants';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingSpinner = ({ message = 'Loading...', size = 'md' }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className={`text-center ${LAYOUT_CONSTANTS.PADDING.section}`}>
      <div
        className={`inline-block animate-spin rounded-full border-b-2 border-blue-600 ${sizeClasses[size]}`}
      ></div>
      <p className="mt-2 text-gray-600 dark:text-gray-400">{message}</p>
    </div>
  );
};
