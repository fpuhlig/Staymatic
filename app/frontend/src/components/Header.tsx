'use client';

import { useRouter } from 'next/navigation';
import { DarkModeToggle } from './DarkModeToggle';

export const Header = () => {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white bg-white/95 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900 dark:bg-gray-900/95">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div
            className="flex cursor-pointer items-center space-x-2 sm:space-x-4"
            onClick={() => router.push('/')}
          >
            <h1 className="text-2xl font-bold text-blue-600 transition-colors duration-200 hover:text-blue-700 sm:text-3xl dark:text-blue-400 dark:hover:text-blue-300">
              Staymatic
            </h1>
            <span className="hidden text-sm text-gray-500 sm:text-base md:block dark:text-gray-400">
              Find your perfect stay
            </span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <DarkModeToggle />
            <button
              onClick={() => router.push('/login')}
              className="rounded-xl border border-blue-600 px-3 py-2 text-sm font-medium text-blue-600 transition-colors duration-200 hover:bg-blue-50 sm:px-4 sm:text-base dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
