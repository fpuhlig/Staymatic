// Utility functions will be exported here
export {};

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
    filter['location.city'] = new RegExp(query.city, 'i');
  }

  if (query.minPrice || query.maxPrice) {
    filter['price.amount'] = {};
    if (query.minPrice) filter['price.amount']!.$gte = Number(query.minPrice);
    if (query.maxPrice) filter['price.amount']!.$lte = Number(query.maxPrice);
  }

  return filter;
};

// Utility function to validate MongoDB ObjectId format
export const isValidObjectId = (id: string): boolean => {
  // MongoDB ObjectId is a 24-character hex string
  return /^[0-9a-fA-F]{24}$/.test(id);
};
