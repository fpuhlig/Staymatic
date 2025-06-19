import { ReactNode } from 'react';

interface FeatureCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export const FeatureCard = ({ title, children, className = '' }: FeatureCardProps) => {
  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800 ${className}`}
    >
      <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
      {children}
    </div>
  );
};
