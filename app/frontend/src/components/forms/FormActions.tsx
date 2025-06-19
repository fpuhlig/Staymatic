import Link from 'next/link';
import { FormButton } from './FormButton';

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
        <Link
          href={cancelHref}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        >
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
