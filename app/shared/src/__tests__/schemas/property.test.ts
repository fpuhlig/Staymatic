import { describe, it, expect } from '@jest/globals';
import {
  createPropertySchema,
  updatePropertySchema,
  propertyFormSchema,
  createUserSchema,
} from '../../schemas/property';

describe('Property Schemas', () => {
  describe('createPropertySchema', () => {
    const validPropertyData = {
      title: 'Beautiful Apartment',
      description: 'A lovely apartment in the city center',
      imageUrl: 'https://example.com/image.jpg',
      location: {
        address: '123 Main St',
        city: 'Berlin',
        country: 'Germany',
      },
      price: {
        amount: 100,
        currency: 'EUR' as const,
        period: 'night' as const,
      },
      amenities: ['WiFi', 'Kitchen'],
      availableFrom: '2024-06-01',
      availableTo: '2024-06-30',
    };

    it('should validate correct property data', () => {
      const result = createPropertySchema.safeParse(validPropertyData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.title).toBe('Beautiful Apartment');
        expect(result.data.availableFrom).toBeInstanceOf(Date);
        expect(result.data.availableTo).toBeInstanceOf(Date);
      }
    });

    it('should reject empty title', () => {
      const invalidData = { ...validPropertyData, title: '' };
      const result = createPropertySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe('Title is required');
      }
    });

    it('should reject invalid URL', () => {
      const invalidData = { ...validPropertyData, imageUrl: 'not-a-url' };
      const result = createPropertySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe('Must be a valid URL');
      }
    });

    it('should reject negative price', () => {
      const invalidData = {
        ...validPropertyData,
        price: { ...validPropertyData.price, amount: -50 },
      };
      const result = createPropertySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe('Price must be positive');
      }
    });

    it('should reject availableTo before availableFrom', () => {
      const invalidData = {
        ...validPropertyData,
        availableFrom: '2024-06-30',
        availableTo: '2024-06-01',
      };
      const result = createPropertySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe('availableTo must be after availableFrom');
      }
    });

    it('should set default values correctly', () => {
      const dataWithoutDefaults = {
        ...validPropertyData,
        price: { amount: 100 }, // Missing currency and period
        amenities: undefined,
      };
      delete dataWithoutDefaults.amenities;

      const result = createPropertySchema.safeParse(dataWithoutDefaults);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.price.currency).toBe('EUR');
        expect(result.data.price.period).toBe('night');
        expect(result.data.amenities).toEqual([]);
      }
    });
  });

  describe('updatePropertySchema', () => {
    it('should validate partial updates', () => {
      const partialUpdate = {
        title: 'Updated Title',
        price: { amount: 150, currency: 'USD' as const },
      };
      const result = updatePropertySchema.safeParse(partialUpdate);
      expect(result.success).toBe(true);
    });

    it('should allow empty updates', () => {
      const result = updatePropertySchema.safeParse({});
      expect(result.success).toBe(true);
    });

    it('should validate date consistency when both dates provided', () => {
      const invalidUpdate = {
        availableFrom: '2024-06-30',
        availableTo: '2024-06-01',
      };
      const result = updatePropertySchema.safeParse(invalidUpdate);
      expect(result.success).toBe(false);
    });
  });

  describe('propertyFormSchema', () => {
    const validFormData = {
      title: 'Form Test Property',
      description: 'Description for form',
      imageUrl: 'https://example.com/form-image.jpg',
      location: {
        address: '456 Form St',
        city: 'Munich',
        country: 'Germany',
      },
      price: {
        amount: 80,
        currency: 'EUR' as const,
        period: 'night' as const,
      },
      amenities: ['WiFi'],
      availableFrom: '2024-07-01',
      availableTo: '2024-07-31',
    };

    it('should validate form data without date transformation', () => {
      const result = propertyFormSchema.safeParse(validFormData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(typeof result.data.availableFrom).toBe('string');
        expect(typeof result.data.availableTo).toBe('string');
      }
    });

    it('should reject invalid date range', () => {
      const invalidFormData = {
        ...validFormData,
        availableFrom: '2024-07-31',
        availableTo: '2024-07-01',
      };
      const result = propertyFormSchema.safeParse(invalidFormData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe('End date must be after start date');
      }
    });
  });

  describe('createUserSchema', () => {
    it('should validate user data', () => {
      const userData = {
        email: 'test@example.com',
        name: 'Test User',
        image: 'https://example.com/avatar.jpg',
      };
      const result = createUserSchema.safeParse(userData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.emailVerified).toBe(false); // default value
      }
    });

    it('should reject invalid email', () => {
      const userData = {
        email: 'invalid-email',
        name: 'Test User',
      };
      const result = createUserSchema.safeParse(userData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe('Invalid email address');
      }
    });
  });
});
