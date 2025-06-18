'use client';

import { useState } from 'react';
import { NavLink } from './NavLink';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Desktop Navigation */}
          <div className="hidden w-full items-center justify-center md:flex">
            <div className="flex space-x-8">
              <NavLink href="#" className="rounded-xl px-3 py-2">
                Home
              </NavLink>
              <NavLink href="#" className="rounded-xl px-3 py-2">
                Properties
              </NavLink>
              <NavLink href="#" className="rounded-xl px-3 py-2">
                About
              </NavLink>
              <NavLink href="#" className="rounded-xl px-3 py-2">
                Contact
              </NavLink>
              <NavLink href="#" className="rounded-xl px-3 py-2">
                Help
              </NavLink>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex w-full items-center justify-end md:hidden">
            {/* Hamburger Button */}
            <button
              onClick={toggleMenu}
              className="rounded-xl p-2 text-gray-700 transition-colors duration-200 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              aria-label="Toggle menu"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="border-t border-gray-200 bg-white md:hidden dark:border-gray-700 dark:bg-gray-900">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <NavLink
                href="#"
                className="block rounded-xl px-3 py-2"
                onClick={() => setIsOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                href="#"
                className="block rounded-xl px-3 py-2"
                onClick={() => setIsOpen(false)}
              >
                Properties
              </NavLink>
              <NavLink
                href="#"
                className="block rounded-xl px-3 py-2"
                onClick={() => setIsOpen(false)}
              >
                About
              </NavLink>
              <NavLink
                href="#"
                className="block rounded-xl px-3 py-2"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </NavLink>
              <NavLink
                href="#"
                className="block rounded-xl px-3 py-2"
                onClick={() => setIsOpen(false)}
              >
                Help
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
