import { ReactNode } from 'react';

interface FooterLinkProps {
  href: string;
  children: ReactNode;
  variant?: 'default' | 'social' | 'legal';
  className?: string;
}

export const FooterLink = ({ href, children, variant = 'default', className = '' }: FooterLinkProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'social':
        return "text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400";
      case 'legal':
        return "text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm";
      default:
        return "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400";
    }
  };

  const baseStyles = "transition-colors duration-200";
  const variantStyles = getVariantStyles();
  
  return (
    <a
      href={href}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {children}
    </a>
  );
}; 