'use client';

import { useState } from 'react';
import { NavigationLink } from './NavigationLink';
import { MobileMenuButton } from './MobileMenuButton';

interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

interface NavigationMenuProps {
  items?: NavigationItem[];
  className?: string;
}

const defaultItems: NavigationItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Properties', href: '/properties' },
  { label: 'Host Dashboard', href: '/host/dashboard' },
  { label: 'About', href: '/about' },
  { label: 'Help', href: '/help' },
];

export const NavigationMenu = ({ items = defaultItems, className = '' }: NavigationMenuProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={className}>
      {/* Desktop Navigation */}
      <div className="hidden md:flex md:items-center md:space-x-1">
        {items.map(item => (
          <NavigationLink key={item.href} href={item.href} external={item.external}>
            {item.label}
          </NavigationLink>
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <MobileMenuButton isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="absolute left-0 right-0 top-full border-t border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
            <div className="space-y-1 px-4 py-3">
              {items.map(item => (
                <NavigationLink
                  key={item.href}
                  href={item.href}
                  external={item.external}
                  className="block w-full"
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </NavigationLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
