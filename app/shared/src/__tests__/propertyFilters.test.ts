import { describe, it, expect } from '@jest/globals';
import { buildPropertyFilter } from '../utils/propertyFilters';

describe('Property Filters', () => {
  it('should build filter for city search', () => {
    const query = { city: 'Berlin' };
    const filter = buildPropertyFilter(query);

    expect(filter['location.city']).toEqual({ $regex: 'Berlin', $options: 'i' });
  });

  it('should build filter for price range', () => {
    const query = { minPrice: '50', maxPrice: '200' };
    const filter = buildPropertyFilter(query);

    expect(filter['price.amount']).toEqual({ $gte: 50, $lte: 200 });
  });

  it('should build filter for host', () => {
    const query = { hostId: 'host123' };
    const filter = buildPropertyFilter(query);

    expect(filter.hostId).toBe('host123');
  });
});
