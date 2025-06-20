import { PropertyFilter } from '../types';

// Utility function to build property filter from query parameters
export const buildPropertyFilter = (query: {
  hostId?: string;
  city?: string;
  minPrice?: string;
  maxPrice?: string;
}): PropertyFilter => {
  const filter: PropertyFilter = {};

  if (query.hostId) {
    filter.hostId = query.hostId;
  }

  if (query.city) {
    filter['location.city'] = { $regex: query.city, $options: 'i' };
  }

  if (query.minPrice || query.maxPrice) {
    filter['price.amount'] = {};

    if (query.minPrice) {
      const minPrice = parseFloat(query.minPrice);
      if (!Number.isNaN(minPrice)) {
        filter['price.amount'].$gte = minPrice;
      }
    }

    if (query.maxPrice) {
      const maxPrice = parseFloat(query.maxPrice);
      if (!Number.isNaN(maxPrice)) {
        filter['price.amount'].$lte = maxPrice;
      }
    }
  }

  return filter;
};
