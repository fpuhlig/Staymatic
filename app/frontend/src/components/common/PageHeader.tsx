interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const PageHeader = ({ title, subtitle, className = '' }: PageHeaderProps) => {
  return (
    <div className={`mb-12 text-center ${className}`}>
      <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white">{title}</h1>
      {subtitle && <p className="text-xl text-gray-600 dark:text-gray-400">{subtitle}</p>}
    </div>
  );
};
