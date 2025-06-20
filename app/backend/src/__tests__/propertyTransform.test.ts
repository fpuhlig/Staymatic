// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, it, expect } from '@jest/globals';
import { transformPropertyDocument } from '../utils/propertyTransform';

describe('Property Transform', () => {
  it('should transform MongoDB document to Property', () => {
    // Mock minimal MongoDB document
    const mockDoc = {
      _id: { toString: () => '507f1f77bcf86cd799439011' },
      hostId: 'host123',
      title: 'Test Property',
      description: 'Nice place',
      imageUrl: 'https://example.com/image.jpg',
      location: { city: 'Berlin', country: 'Germany' },
      price: { amount: 100, currency: 'EUR' },
      amenities: ['WiFi'],
      availableFrom: new Date('2024-01-01'),
      availableTo: new Date('2024-12-31'),
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    } as unknown as Parameters<typeof transformPropertyDocument>[0];

    const result = transformPropertyDocument(mockDoc);

    expect(result.id).toBe('507f1f77bcf86cd799439011');
    expect(result.title).toBe('Test Property');
    expect(result.hostId).toBe('host123');
    expect(result.price.amount).toBe(100);
  });
});
