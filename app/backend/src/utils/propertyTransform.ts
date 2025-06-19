import { Types } from 'mongoose';
import { Property } from '../../../shared/src/types';
import { IPropertyDocument } from '../models/property';

/**
 * Transform MongoDB Property document to shared Property type
 * This ensures consistent data format across frontend and backend
 */
export function transformPropertyDocument(doc: IPropertyDocument): Property {
  return {
    id: (doc._id as Types.ObjectId).toString(),
    hostId: doc.hostId,
    title: doc.title,
    description: doc.description,
    imageUrl: doc.imageUrl,
    location: doc.location,
    price: doc.price,
    amenities: doc.amenities,
    rating: doc.rating,
    availableFrom: doc.availableFrom,
    availableTo: doc.availableTo,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}
