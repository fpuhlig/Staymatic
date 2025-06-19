'use client';

import { useRouter } from 'next/navigation';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
}

export const Logo = ({ className = '', showTagline = true }: LogoProps) => {
  const router = useRouter();

  return (
    <div
      className={`flex cursor-pointer items-center space-x-2 sm:space-x-4 ${className}`}
      onClick={() => router.push('/')}
    >
      <h1 className="text-2xl font-bold text-blue-600 transition-colors duration-200 hover:text-blue-700 sm:text-3xl dark:text-blue-400 dark:hover:text-blue-300">
        Staymatic
      </h1>
      {showTagline && (
        <span className="hidden text-sm text-gray-500 sm:text-base md:block dark:text-gray-400">
          Find your perfect stay
        </span>
      )}
    </div>
  );
};
