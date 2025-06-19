'use client';

import { useRouter } from 'next/navigation';
import { DarkModeToggle } from './DarkModeToggle';
import { useSession, signOut } from '../lib/auth-client';

export const Header = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

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
            {isPending ? (
              <div className="animate-pulse">
                <div className="h-9 w-20 rounded-xl bg-gray-200 dark:bg-gray-700"></div>
              </div>
            ) : session?.user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Hi, {session.user.name}
                </span>
                <button
                  onClick={handleSignOut}
                  className="rounded-xl border border-red-600 px-3 py-2 text-sm font-medium text-red-600 transition-colors duration-200 hover:bg-red-50 sm:px-4 sm:text-base dark:border-red-400 dark:text-red-400 dark:hover:bg-red-900/20"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => router.push('/register')}
                  className="rounded-xl bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700 sm:px-4 sm:text-base"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => router.push('/login')}
                  className="rounded-xl border border-blue-600 px-3 py-2 text-sm font-medium text-blue-600 transition-colors duration-200 hover:bg-blue-50 sm:px-4 sm:text-base dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
