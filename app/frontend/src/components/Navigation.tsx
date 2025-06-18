'use client';

import { useState } from 'react';
import { NavLink } from './NavLink';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-center items-center w-full">
            <div className="flex space-x-8">
              <NavLink href="#" className="px-3 py-2 rounded-xl">
                Home
              </NavLink>
              <NavLink href="#" className="px-3 py-2 rounded-xl">
                Properties
              </NavLink>
              <NavLink href="#" className="px-3 py-2 rounded-xl">
                About
              </NavLink>
              <NavLink href="#" className="px-3 py-2 rounded-xl">
                Contact
              </NavLink>
              <NavLink href="#" className="px-3 py-2 rounded-xl">
                Help
              </NavLink>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex justify-end items-center w-full">
            {/* Hamburger Button */}
            <button
              onClick={toggleMenu}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 p-2 rounded-xl transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <NavLink
                href="#"
                className="block px-3 py-2 rounded-xl"
                onClick={() => setIsOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                href="#"
                className="block px-3 py-2 rounded-xl"
                onClick={() => setIsOpen(false)}
              >
                Properties
              </NavLink>
              <NavLink
                href="#"
                className="block px-3 py-2 rounded-xl"
                onClick={() => setIsOpen(false)}
              >
                About
              </NavLink>
              <NavLink
                href="#"
                className="block px-3 py-2 rounded-xl"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </NavLink>
              <NavLink
                href="#"
                className="block px-3 py-2 rounded-xl"
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