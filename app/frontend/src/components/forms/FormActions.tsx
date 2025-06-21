import Link from 'next/link';
import { FormButton } from './FormButton';
import { getButtonClasses } from '../common/ButtonStyles';

interface FormActionsProps {
  submitLabel: string;
  submitLoadingLabel?: string;
  isSubmitting?: boolean;
  cancelHref?: string;
  cancelLabel?: string;
  className?: string;
}

export const FormActions = ({
  submitLabel,
  submitLoadingLabel,
  isSubmitting = false,
  cancelHref,
  cancelLabel = 'Cancel',
  className = '',
}: FormActionsProps) => {
  return (
    <div
      className={`flex justify-end gap-4 border-t border-gray-200 pt-6 dark:border-gray-700 ${className}`}
    >
      {cancelHref && (
        <Link href={cancelHref} className={getButtonClasses('secondary', 'md')}>
          {cancelLabel}
        </Link>
      )}
      <FormButton
        type="submit"
        disabled={isSubmitting}
        loading={isSubmitting}
        loadingText={submitLoadingLabel}
        className="px-6 py-2"
      >
        {submitLabel}
      </FormButton>
    </div>
  );
};
