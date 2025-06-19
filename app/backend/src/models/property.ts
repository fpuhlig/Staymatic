import { Property } from '../../../shared/src/types';
import { Schema, Document, model } from 'mongoose';

// MongoDB Document interface extending shared Property type
export interface IPropertyDocument extends Document, Omit<Property, 'id'> {
  // MongoDB adds _id automatically, and we omit 'id' from shared Property
}

const PropertySchema = new Schema<IPropertyDocument>(
  {
    hostId: {
      type: String, // Better Auth uses string IDs
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      address: {
        type: String,
        required: true,
        trim: true,
      },
      city: {
        type: String,
        required: true,
        trim: true,
      },
      country: {
        type: String,
        required: true,
        trim: true,
      },
    },
    price: {
      amount: {
        type: Number,
        required: true,
        min: 0,
      },
      currency: {
        type: String,
        required: true,
        enum: ['EUR', 'USD', 'GBP'],
        default: 'EUR',
      },
      period: {
        type: String,
        required: true,
        enum: ['night', 'week', 'month'],
        default: 'night',
      },
    },
    amenities: [
      {
        type: String,
        trim: true,
      },
    ],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    availableFrom: {
      type: Date,
      required: true,
    },
    availableTo: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  },
);

// Add indexes for efficient queries
PropertySchema.index({ hostId: 1 });
PropertySchema.index({ 'location.city': 1 });
PropertySchema.index({ 'price.amount': 1 });

export const PropertyModel = model<IPropertyDocument>('Property', PropertySchema);
