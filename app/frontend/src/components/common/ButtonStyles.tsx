// Button style utilities to follow DRY principle
export const BUTTON_STYLES = {
  base: 'inline-flex items-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',

  variants: {
    primary:
      'text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 dark:active:bg-blue-700',
    secondary:
      'text-gray-700 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 focus:ring-gray-500 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:active:bg-gray-500',
    outline:
      'text-blue-600 border border-blue-600 hover:bg-blue-50 active:bg-blue-100 focus:ring-blue-500 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-900/20 dark:active:bg-blue-900/30',
    danger:
      'text-white bg-red-600 hover:bg-red-700 active:bg-red-800 focus:ring-red-500 dark:bg-red-500 dark:hover:bg-red-600 dark:active:bg-red-700',
  },

  sizes: {
    xs: 'px-2 py-1.5 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  },
} as const;

export type ButtonVariant = keyof typeof BUTTON_STYLES.variants;
export type ButtonSize = keyof typeof BUTTON_STYLES.sizes;

export const getButtonClasses = (
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className = '',
): string => {
  return `${BUTTON_STYLES.base} ${BUTTON_STYLES.variants[variant]} ${BUTTON_STYLES.sizes[size]} ${className}`.trim();
};
