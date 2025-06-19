interface FormSectionProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
}

export const FormSection = ({ children, title, description, className = '' }: FormSectionProps) => {
  return (
    <div className={className}>
      <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">{title}</h2>
      {description && (
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">{description}</p>
      )}
      {children}
    </div>
  );
};
