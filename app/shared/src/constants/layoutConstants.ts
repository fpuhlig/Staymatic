// Layout constants for consistent UI across applications
export const LAYOUT_CONSTANTS = {
  // Container max widths
  MAX_WIDTH: {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '7xl': 'max-w-7xl',
  },

  // Standard padding
  PADDING: {
    container: 'px-4 sm:px-6 lg:px-8',
    section: 'py-8 sm:py-12',
    card: 'p-6',
    form: 'p-8',
  },

  // Standard margins
  MARGIN: {
    section: 'mb-8',
    header: 'mb-12',
    element: 'mb-6',
    small: 'mb-4',
  },

  // Typography
  TYPOGRAPHY: {
    h1: 'text-3xl font-bold sm:text-4xl',
    h2: 'text-2xl font-bold sm:text-3xl',
    h3: 'text-xl font-bold sm:text-2xl',
    subtitle: 'text-gray-600 dark:text-gray-400',
    body: 'text-gray-700 dark:text-gray-300',
  },

  // Grid layouts
  GRID: {
    properties: 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3',
    features: 'grid gap-6 md:grid-cols-2',
    stats: 'grid grid-cols-1 gap-4 sm:grid-cols-3',
  },

  // Common spacing
  SPACING: {
    xs: 'space-y-2',
    sm: 'space-y-4',
    md: 'space-y-6',
    lg: 'space-y-8',
    xl: 'space-y-12',
  },
} as const;

// Helper functions for layout (TDA - Tell, Don't Ask)
export const layoutHelpers = {
  getContainerClasses: (maxWidth: keyof typeof LAYOUT_CONSTANTS.MAX_WIDTH = '7xl') => {
    return `mx-auto ${LAYOUT_CONSTANTS.MAX_WIDTH[maxWidth]} ${LAYOUT_CONSTANTS.PADDING.container} ${LAYOUT_CONSTANTS.PADDING.section}`;
  },

  getPageHeaderClasses: () => {
    return `${LAYOUT_CONSTANTS.MARGIN.header} text-center`;
  },

  getSectionClasses: () => {
    return LAYOUT_CONSTANTS.MARGIN.section;
  },
} as const;

// Type export
export type LayoutConstants = typeof LAYOUT_CONSTANTS;
