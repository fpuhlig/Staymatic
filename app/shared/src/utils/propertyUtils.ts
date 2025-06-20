// Property transformation utilities
export const propertyUtils = {
  // Combine imageUrl with images array, removing duplicates (KISS principle)
  combineImages: (imageUrl: string, images?: string[]): string[] => {
    const allImages = [imageUrl, ...(images || [])];
    // Remove duplicates and empty strings
    return [...new Set(allImages.filter(Boolean))];
  },

  // Format property price for display
  formatPrice: (amount: number, currency: string, period: string): string => {
    return `${currency}${amount}/${period}`;
  },

  // Validate property data (SOLID - Single Responsibility)
  validatePropertyData: (data: Record<string, unknown>): boolean => {
    return !!(
      data.title &&
      data.description &&
      data.imageUrl &&
      data.location &&
      typeof data.location === 'object' &&
      data.location !== null &&
      (data.location as Record<string, unknown>).city &&
      (data.location as Record<string, unknown>).country &&
      data.price &&
      typeof data.price === 'object' &&
      data.price !== null &&
      (data.price as Record<string, unknown>).amount &&
      (data.price as Record<string, unknown>).currency
    );
  },
} as const;
