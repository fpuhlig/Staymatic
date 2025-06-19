import { ReactNode } from 'react';

interface ContentSectionProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export const ContentSection = ({ title, children, className = '' }: ContentSectionProps) => {
  return (
    <section className={className}>
      {title && <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>}
      {children}
    </section>
  );
};
