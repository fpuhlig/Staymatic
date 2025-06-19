import Link from 'next/link';

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
  const ActionComponent = () => {
    if (actionHref) {
      return (
        <Link
          href={actionHref}
          className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
        >
          {actionLabel}
        </Link>
      );
    }

    if (onAction && actionLabel) {
      return (
        <button
          onClick={onAction}
          className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
        >
          {actionLabel}
        </button>
      );
    }

    return null;
  };

  return (
    <div className="py-12 text-center">
      <div className="mx-auto mb-4 h-12 w-12 text-gray-400">{icon}</div>
      <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">{title}</h3>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
      {actionLabel && (actionHref || onAction) && (
        <div className="mt-6">
          <ActionComponent />
        </div>
      )}
    </div>
  );
};
