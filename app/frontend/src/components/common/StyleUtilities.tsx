// Comprehensive style utilities following DRY principle
export const STYLE_UTILITIES = {
  // Card styles - used in multiple components
  card: {
    base: 'rounded-lg bg-white shadow dark:bg-gray-800',
    bordered:
      'rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800',
    interactive: 'rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg dark:bg-gray-800',
    section: 'rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800',
  },

  // Text color patterns
  text: {
    primary: 'text-gray-900 dark:text-white',
    secondary: 'text-gray-500 dark:text-gray-400',
    muted: 'text-gray-600 dark:text-gray-400',
    accent: 'text-blue-600 dark:text-blue-400',
    danger: 'text-red-600 dark:text-red-400',
  },

  // Typography patterns
  typography: {
    h1: 'text-3xl font-bold sm:text-4xl',
    h2: 'text-2xl font-bold',
    h3: 'text-xl font-semibold',
    h4: 'text-lg font-semibold',
    body: 'text-sm',
    caption: 'text-xs',
  },

  // Common heading combinations
  heading: {
    h1: 'text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white',
    h2: 'text-2xl font-bold text-gray-900 dark:text-white',
    h3: 'text-xl font-semibold text-gray-900 dark:text-white',
    h4: 'text-lg font-semibold text-gray-900 dark:text-white',
    subtitle: 'text-sm font-medium text-gray-500 dark:text-gray-400',
  },

  // Dropdown/Modal patterns
  dropdown: {
    container:
      'absolute right-0 mt-2 w-56 rounded-lg border border-gray-200 bg-white py-2 shadow-lg dark:border-gray-700 dark:bg-gray-800',
    item: 'flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700',
    separator: 'border-t border-gray-200 dark:border-gray-700',
  },

  // Form patterns
  form: {
    container: 'w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800',
    section: 'space-y-4',
    label: 'block text-sm font-medium text-gray-700 dark:text-gray-300',
    input:
      'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white',
  },

  // Avatar patterns
  avatar: {
    sm: 'h-6 w-6 rounded-full',
    md: 'h-8 w-8 rounded-full',
    lg: 'h-10 w-10 rounded-full',
  },

  // Badge/Tag patterns
  badge: {
    default:
      'inline-flex items-center border border-gray-300 bg-gray-200 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200',
    rounded:
      'inline-flex items-center rounded-full border border-gray-300 bg-gray-200 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200',
  },
} as const;

// Utility functions for common combinations
export const getCardClasses = (
  variant: keyof typeof STYLE_UTILITIES.card = 'base',
  className = '',
) => {
  return `${STYLE_UTILITIES.card[variant]} ${className}`.trim();
};

export const getHeadingClasses = (level: keyof typeof STYLE_UTILITIES.heading, className = '') => {
  return `${STYLE_UTILITIES.heading[level]} ${className}`.trim();
};

export const getTextClasses = (variant: keyof typeof STYLE_UTILITIES.text, className = '') => {
  return `${STYLE_UTILITIES.text[variant]} ${className}`.trim();
};

export const getDropdownClasses = (part: keyof typeof STYLE_UTILITIES.dropdown, className = '') => {
  return `${STYLE_UTILITIES.dropdown[part]} ${className}`.trim();
};

export const getBadgeClasses = (
  variant: keyof typeof STYLE_UTILITIES.badge = 'default',
  className = '',
) => {
  return `${STYLE_UTILITIES.badge[variant]} ${className}`.trim();
};
