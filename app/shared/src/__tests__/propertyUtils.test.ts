import { describe, it, expect } from '@jest/globals';
import { propertyUtils } from '../utils/propertyUtils';

describe('Property Utils', () => {
  it('should combine images correctly', () => {
    const result = propertyUtils.combineImages('main.jpg', ['1.jpg', '2.jpg']);
    expect(result).toEqual(['main.jpg', '1.jpg', '2.jpg']);
  });

  it('should remove duplicate images', () => {
    const result = propertyUtils.combineImages('main.jpg', ['main.jpg', '1.jpg', '2.jpg']);
    expect(result).toEqual(['main.jpg', '1.jpg', '2.jpg']);
  });

  it('should filter out empty strings', () => {
    const result = propertyUtils.combineImages('main.jpg', ['', '1.jpg', '', '2.jpg']);
    expect(result).toEqual(['main.jpg', '1.jpg', '2.jpg']);
  });

  it('should handle empty images array', () => {
    const result = propertyUtils.combineImages('main.jpg', []);
    expect(result).toEqual(['main.jpg']);
  });

  it('should handle undefined images array', () => {
    const result = propertyUtils.combineImages('main.jpg', undefined);
    expect(result).toEqual(['main.jpg']);
  });

  it('should format price correctly', () => {
    const result = propertyUtils.formatPrice(100, 'EUR', 'night');
    expect(result).toBe('EUR100/night');
  });

  it('should validate complete property data', () => {
    const validData = {
      title: 'Test',
      description: 'Test desc',
      imageUrl: 'test.jpg',
      location: { city: 'Berlin', country: 'Germany' },
      price: { amount: 100, currency: 'EUR' },
    };

    const result = propertyUtils.validatePropertyData(validData);
    expect(result).toBe(true);
  });
});
