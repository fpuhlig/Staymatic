'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from '../../lib/auth-client';
import { useUser } from '../../lib/user-context';
import { UserAvatar } from './UserAvatar';
import { getButtonClasses } from '../common/ButtonStyles';
import { getDropdownClasses, getTextClasses } from '../common/StyleUtilities';

interface DropdownItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export const UserDropdown = () => {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center space-x-2 sm:space-x-3">
        <button
          onClick={() => router.push('/register')}
          className={getButtonClasses('primary', 'xs', 'sm:px-4 sm:py-2 sm:text-sm')}
        >
          Sign Up
        </button>
        <button
          onClick={() => router.push('/login')}
          className={getButtonClasses('outline', 'xs', 'sm:px-4 sm:py-2 sm:text-sm')}
        >
          Sign In
        </button>
      </div>
    );
  }

  const menuItems: DropdownItem[] = [
    {
      label: 'Host Dashboard',
      href: '/host/dashboard',
      icon: (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      label: 'Profile Settings',
      href: '/profile',
      icon: (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
  ];

  const handleItemClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <UserAvatar user={user} />

        {/* User Info (hidden on mobile and tablet) */}
        <div className="hidden text-left lg:block">
          <p className={`text-sm font-medium ${getTextClasses('primary')}`}>
            {user.name || 'User'}
          </p>
          <p className={getTextClasses('secondary')}>{user.email}</p>
        </div>

        {/* Dropdown Arrow */}
        <svg
          className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={getDropdownClasses('container')}>
          {/* User Info in Dropdown (mobile and tablet) */}
          <div className={`${getDropdownClasses('separator')} px-4 py-3 lg:hidden`}>
            <p className={`text-sm font-medium ${getTextClasses('primary')}`}>
              {user.name || 'User'}
            </p>
            <p className={getTextClasses('secondary')}>{user.email}</p>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleItemClick(item.href)}
                className={getDropdownClasses('item')}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>

          {/* Sign Out */}
          <div className={`${getDropdownClasses('separator')} pt-1`}>
            <button
              onClick={handleSignOut}
              className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              <svg className="mr-3 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
