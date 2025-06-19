import { z } from 'zod';

// Schema for property location
const locationSchema = z.object({
  address: z.string().min(1, 'Address is required').max(200, 'Address too long'),
  city: z.string().min(1, 'City is required').max(100, 'City too long'),
  country: z.string().min(1, 'Country is required').max(100, 'Country too long'),
});

// Schema for property price
const priceSchema = z.object({
  amount: z.number().min(0, 'Price must be positive'),
  currency: z.enum(['EUR', 'USD', 'GBP']).default('EUR'),
  period: z.enum(['night', 'week', 'month']).default('night'),
});

// Schema for creating a new property
export const createPropertySchema = z
  .object({
    title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
    description: z.string().min(1, 'Description is required').max(2000, 'Description too long'),
    imageUrl: z.string().url('Must be a valid URL'),
    images: z
      .array(z.string().url('Must be a valid URL'))
      .max(10, 'Maximum 10 images allowed')
      .optional(),
    location: locationSchema,
    price: priceSchema,
    amenities: z.array(z.string()).default([]),
    availableFrom: z.string().transform(str => new Date(str)),
    availableTo: z.string().transform(str => new Date(str)),
  })
  .refine(data => data.availableTo > data.availableFrom, {
    message: 'availableTo must be after availableFrom',
    path: ['availableTo'],
  });

// Schema for updating a property (all fields optional)
export const updatePropertySchema = z
  .object({
    hostId: z.string().optional(),
    title: z.string().min(1, 'Title is required').max(200, 'Title too long').optional(),
    description: z
      .string()
      .min(1, 'Description is required')
      .max(2000, 'Description too long')
      .optional(),
    imageUrl: z.string().url('Must be a valid URL').optional(),
    images: z
      .array(z.string().url('Must be a valid URL'))
      .max(10, 'Maximum 10 images allowed')
      .optional(),
    location: locationSchema.optional(),
    price: priceSchema.optional(),
    amenities: z.array(z.string()).optional(),
    availableFrom: z
      .string()
      .transform(str => new Date(str))
      .optional(),
    availableTo: z
      .string()
      .transform(str => new Date(str))
      .optional(),
  })
  .refine(
    data => {
      if (data.availableFrom && data.availableTo) {
        return data.availableTo > data.availableFrom;
      }
      return true;
    },
    {
      message: 'availableTo must be after availableFrom',
      path: ['availableTo'],
    },
  );

// Schema for query parameters
export const propertyQuerySchema = z.object({
  city: z.string().optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  amenities: z.array(z.string()).optional(),
});

// Frontend form schema (without date transformation for client-side)
export const propertyFormSchema = z
  .object({
    title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
    description: z.string().min(1, 'Description is required').max(2000, 'Description too long'),
    imageUrl: z.string().url('Must be a valid URL'),
    images: z.string().optional(), // Comma-separated URLs on frontend
    location: locationSchema,
    price: priceSchema,
    amenities: z.array(z.string()).default([]),
    availableFrom: z.string(),
    availableTo: z.string(),
  })
  .refine(data => new Date(data.availableTo) > new Date(data.availableFrom), {
    message: 'End date must be after start date',
    path: ['availableTo'],
  });

// User creation schema (for test users)
export const createUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  emailVerified: z.boolean().default(false),
  image: z.string().url('Must be a valid URL').optional(),
});

// Type exports for both frontend and backend
export type CreatePropertyData = z.infer<typeof createPropertySchema>;
export type UpdatePropertyData = z.infer<typeof updatePropertySchema>;
export type PropertyQuery = z.infer<typeof propertyQuerySchema>;
export type PropertyFormData = z.infer<typeof propertyFormSchema>;
export type CreateUserData = z.infer<typeof createUserSchema>;
