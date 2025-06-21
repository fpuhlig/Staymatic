import React from 'react';
import { LAYOUT_CONSTANTS } from '../../../shared/src/constants';
import { FooterLink } from './FooterLink';

export const Footer = () => {
  return (
    <footer className="mt-8 border-t border-gray-200 bg-white sm:mt-12 dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <h3
              className={`${LAYOUT_CONSTANTS.MARGIN.small} ${LAYOUT_CONSTANTS.TYPOGRAPHY.h2} text-blue-600 dark:text-blue-400`}
            >
              Staymatic
            </h3>
            <p
              className={`${LAYOUT_CONSTANTS.MARGIN.small} max-w-md ${LAYOUT_CONSTANTS.TYPOGRAPHY.subtitle}`}
            >
              Find your perfect stay. We offer the best properties with amazing amenities and
              locations.
            </p>
            <div className="flex space-x-4">
              <FooterLink href="#" variant="social">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </FooterLink>
              <FooterLink href="#" variant="social">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 2.154c3.198 0 3.586.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.650.069 4.849 0 3.198-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.109c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </FooterLink>
              <FooterLink href="#" variant="social">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </FooterLink>
            </div>
          </div>

          <div className="sm:col-span-1">
            <h4
              className={`${LAYOUT_CONSTANTS.MARGIN.small} text-lg font-semibold text-gray-900 dark:text-white`}
            >
              Quick Links
            </h4>
            <ul className={LAYOUT_CONSTANTS.SPACING.sm}>
              <li>
                <FooterLink href="/">Home</FooterLink>
              </li>
              <li>
                <FooterLink href="/properties">Properties</FooterLink>
              </li>
              <li>
                <FooterLink href="/about">About Us</FooterLink>
              </li>
              <li>
                <FooterLink href="mailto:hello@staymatic.com">Contact</FooterLink>
              </li>
            </ul>
          </div>

          <div className="sm:col-span-1">
            <h4
              className={`${LAYOUT_CONSTANTS.MARGIN.small} text-lg font-semibold text-gray-900 dark:text-white`}
            >
              Support
            </h4>
            <ul className={LAYOUT_CONSTANTS.SPACING.sm}>
              <li>
                <FooterLink href="/help">Help Center</FooterLink>
              </li>
              <li>
                <FooterLink href="/help">Privacy Policy</FooterLink>
              </li>
              <li>
                <FooterLink href="/help">Terms of Service</FooterLink>
              </li>
              <li>
                <FooterLink href="/help">FAQ</FooterLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between border-t border-gray-200 pt-8 md:flex-row dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 Staymatic. All rights reserved.
          </p>
          <div className="mt-4 flex space-x-6 md:mt-0">
            <FooterLink href="#" variant="legal">
              Privacy
            </FooterLink>
            <FooterLink href="#" variant="legal">
              Terms
            </FooterLink>
            <FooterLink href="#" variant="legal">
              Cookies
            </FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
};
