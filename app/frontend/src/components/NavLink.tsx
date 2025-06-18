import { ReactNode } from 'react';

interface NavLinkProps {
  href: string;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export const NavLink = ({ href, children, onClick, className = '' }: NavLinkProps) => {
  const baseStyles =
    'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200';

  return (
    <a href={href} onClick={onClick} className={`${baseStyles} ${className}`}>
      {children}
    </a>
  );
};
