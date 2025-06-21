import { LAYOUT_CONSTANTS } from '../../../shared/src/constants';
import { getButtonClasses } from './common/ButtonStyles';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export const ErrorMessage = ({ message, onRetry, retryLabel = 'Try Again' }: ErrorMessageProps) => {
  return (
    <div className={`text-center ${LAYOUT_CONSTANTS.PADDING.section}`}>
      <div className="mx-auto mb-4 h-12 w-12 text-red-400">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>
      <p className="mb-4 text-red-600 dark:text-red-400">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className={getButtonClasses('primary', 'md')}>
          {retryLabel}
        </button>
      )}
    </div>
  );
};
