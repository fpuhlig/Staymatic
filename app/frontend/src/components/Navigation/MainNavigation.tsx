'use client';

import React, { useState } from 'react';
import { Logo } from './Logo';
import { NavigationLink } from './NavigationLink';
import { UserDropdown } from './UserDropdown';
import { MobileMenuButton } from './MobileMenuButton';
import { DarkModeToggle } from '../DarkModeToggle';

interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

interface MainNavigationProps {
  navigationItems?: NavigationItem[];
  className?: string;
}

const defaultItems: NavigationItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Properties', href: '/properties' },
  { label: 'Host Dashboard', href: '/host/dashboard' },
  { label: 'About', href: '/about' },
  { label: 'Help', href: '/help' },
];

export const MainNavigation = ({
  navigationItems = defaultItems,
  className = '',
}: MainNavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/95 ${className}`}
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo */}
          <Logo />

          {/* Center: Navigation Menu (Desktop) */}
          <div className="hidden xl:flex xl:flex-1 xl:items-center xl:justify-center xl:space-x-1">
            {navigationItems.map(item => (
              <NavigationLink key={item.href} href={item.href} external={item.external}>
                {item.label}
              </NavigationLink>
            ))}
          </div>

          {/* Right: User Actions & Dark Mode */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="hidden xl:block">
              <DarkModeToggle />
            </div>
            <UserDropdown />

            {/* Mobile Navigation Menu */}
            <div className="xl:hidden">
              <MobileMenuButton isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />

              {/* Mobile Dropdown Menu */}
              {isMobileMenuOpen && (
                <div className="absolute left-0 right-0 top-full border-t-2 border-gray-300 bg-white shadow-2xl ring-2 ring-gray-200 backdrop-blur-sm dark:border-gray-600 dark:bg-gray-800 dark:ring-gray-700">
                  <div className="space-y-1 px-4 py-4">
                    {navigationItems.map(item => (
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

                    {/* Dark Mode Toggle in Mobile Menu */}
                    <div className="mt-3 border-t border-gray-200 pt-3 dark:border-gray-700">
                      <div className="flex items-center justify-center space-x-3">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Dark Mode
                        </span>
                        <DarkModeToggle />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
