'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavigationLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  external?: boolean;
}

export const NavigationLink = ({
  href,
  children,
  className = '',
  onClick,
  external = false,
}: NavigationLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const baseClasses = 'px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200';
  const activeClasses = isActive
    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800';

  const combinedClasses = `${baseClasses} ${activeClasses} ${className}`;

  if (external || href.startsWith('#')) {
    return (
      <a
        href={href}
        className={combinedClasses}
        onClick={onClick}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={combinedClasses} onClick={onClick}>
      {children}
    </Link>
  );
};
