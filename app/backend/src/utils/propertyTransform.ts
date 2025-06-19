import { Types } from 'mongoose';
import { Property } from '@shared/types';
import { IPropertyDocument } from '../models/property';

// Backend-specific utility function to transform MongoDB property document to API response format
export const transformPropertyDocument = (property: IPropertyDocument): Property => ({
  id: (property._id as Types.ObjectId).toString(),
  hostId: property.hostId.toString(),
  title: property.title,
  description: property.description,
  imageUrl: property.imageUrl,
  location: property.location,
  price: property.price,
  amenities: property.amenities,
  rating: property.rating,
  availableFrom: property.availableFrom,
  availableTo: property.availableTo,
  createdAt: property.createdAt,
  updatedAt: property.updatedAt,
});
