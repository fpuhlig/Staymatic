'use client';

import { useState, useEffect } from 'react';

export const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check localStorage first
    const stored = localStorage.getItem('darkMode');
    let isDark = false;

    if (stored !== null) {
      isDark = JSON.parse(stored);
    } else {
      // Check system preference
      isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    setDarkMode(isDark);
    applyDarkMode(isDark);
  }, []);

  const applyDarkMode = (isDark: boolean) => {
    const html = document.documentElement;
    const body = document.body;

    if (isDark) {
      html.classList.add('dark');
      body.classList.add('dark');
    } else {
      html.classList.remove('dark');
      body.classList.remove('dark');
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;

    // Apply to DOM first (instant visual change)
    applyDarkMode(newDarkMode);

    // Then update React state (for icon change)
    setDarkMode(newDarkMode);

    // Save to localStorage (async)
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
  };

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-xl border border-gray-300 bg-white p-2">
        <div className="h-5 w-5 animate-pulse rounded bg-gray-200"></div>
      </div>
    );
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="rounded-xl border border-gray-300 bg-white p-2 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <svg className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          className="h-5 w-5 text-gray-700 dark:text-gray-300"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );
};
