'use client';

import { Logo } from './Logo';
import { NavigationMenu } from './NavigationMenu';
import { UserDropdown } from './UserDropdown';
import { DarkModeToggle } from '../DarkModeToggle';
import { LAYOUT_CONSTANTS } from '../common/LayoutConstants';

interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

interface MainNavigationProps {
  navigationItems?: NavigationItem[];
  className?: string;
}

export const MainNavigation = ({ navigationItems, className = '' }: MainNavigationProps) => {
  return (
    <header
      className={`sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/95 ${className}`}
    >
      <div
        className={`mx-auto ${LAYOUT_CONSTANTS.MAX_WIDTH['7xl']} ${LAYOUT_CONSTANTS.PADDING.container}`}
      >
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo */}
          <Logo />

          {/* Center: Navigation Menu (Desktop) */}
          <div className="hidden md:flex md:flex-1 md:justify-center">
            <NavigationMenu items={navigationItems} />
          </div>

          {/* Right: User Actions & Dark Mode */}
          <div className="flex items-center space-x-4">
            <DarkModeToggle />
            <UserDropdown />

            {/* Mobile Navigation Menu */}
            <div className="md:hidden">
              <NavigationMenu items={navigationItems} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
