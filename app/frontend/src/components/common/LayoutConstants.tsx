// Re-export layout constants from shared package (DRY principle)
import { LAYOUT_CONSTANTS, layoutHelpers } from '../../../../shared/src/constants';

export { LAYOUT_CONSTANTS };

// Legacy exports for backward compatibility (KISS principle)
export const {
  getContainerClasses,
  getPageClasses,
  getPageWithSectionClasses,
  getPageHeaderClasses,
  getSectionClasses,
} = layoutHelpers;
