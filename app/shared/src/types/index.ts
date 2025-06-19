// Common types that are used across frontend and backend
export interface User {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean; // Added to match Better Auth
  image?: string; // Optional user image
  createdAt: Date;
  updatedAt: Date;
}

// Better Auth Session Type
export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Auth Response Types
export interface AuthResponse {
  user: User;
  token: string;
  redirect?: boolean;
}

export interface SessionResponse {
  user: User;
  session: Session;
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
