// Common types that are used across frontend and backend
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Property/Hotel related types
export interface Property {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  location: {
    address: string;
    city: string;
    country: string;
  };
  price: {
    amount: number;
    currency: string;
    period: 'night' | 'week' | 'month';
  };
  amenities: string[];
  rating: number;
  availableFrom: Date;
  availableTo: Date;
  createdAt: Date;
  updatedAt: Date;
}
