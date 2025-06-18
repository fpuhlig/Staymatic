import { Property } from '../types';

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Luxurious Downtown Apartment',
    description:
      'Modern apartment in the heart of the city with stunning skyline views and premium amenities.',
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
    location: {
      address: '123 Main Street',
      city: 'Vienna',
      country: 'Austria',
    },
    price: {
      amount: 120,
      currency: 'EUR',
      period: 'night',
    },
    amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'Parking', 'City View'],
    rating: 4.8,
    availableFrom: new Date('2024-02-01'),
    availableTo: new Date('2024-12-31'),
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'Cozy Mountain Cabin',
    description:
      'Peaceful retreat in the Austrian Alps with breathtaking mountain views and hiking trails nearby.',
    imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
    location: {
      address: '456 Alpine Road',
      city: 'Salzburg',
      country: 'Austria',
    },
    price: {
      amount: 85,
      currency: 'EUR',
      period: 'night',
    },
    amenities: ['WiFi', 'Fireplace', 'Mountain View', 'Hiking', 'Pet Friendly'],
    rating: 4.6,
    availableFrom: new Date('2024-03-01'),
    availableTo: new Date('2024-11-30'),
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    id: '3',
    title: 'Historic City Center Hotel',
    description:
      'Charming boutique hotel in a restored 18th-century building with elegant rooms and traditional architecture.',
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    location: {
      address: '789 Historic Plaza',
      city: 'Graz',
      country: 'Austria',
    },
    price: {
      amount: 95,
      currency: 'EUR',
      period: 'night',
    },
    amenities: ['WiFi', 'Restaurant', 'Historic Building', 'Room Service', 'Concierge'],
    rating: 4.4,
    availableFrom: new Date('2024-01-01'),
    availableTo: new Date('2024-12-31'),
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
  },
  {
    id: '4',
    title: 'Lakeside Villa with Pool',
    description:
      'Stunning lakefront property with private pool, garden, and direct lake access. Perfect for families.',
    imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop',
    location: {
      address: '321 Lakeshore Drive',
      city: 'Hallstatt',
      country: 'Austria',
    },
    price: {
      amount: 200,
      currency: 'EUR',
      period: 'night',
    },
    amenities: ['WiFi', 'Pool', 'Lake Access', 'Garden', 'BBQ Area', 'Family Friendly'],
    rating: 4.9,
    availableFrom: new Date('2024-05-01'),
    availableTo: new Date('2024-09-30'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '5',
    title: 'Modern Business Hotel',
    description:
      'Contemporary hotel designed for business travelers with meeting rooms and high-speed internet.',
    imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop',
    location: {
      address: '654 Business District',
      city: 'Linz',
      country: 'Austria',
    },
    price: {
      amount: 110,
      currency: 'EUR',
      period: 'night',
    },
    amenities: ['WiFi', 'Business Center', 'Meeting Rooms', 'Gym', '24/7 Reception'],
    rating: 4.2,
    availableFrom: new Date('2024-01-01'),
    availableTo: new Date('2024-12-31'),
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '6',
    title: 'Romantic Countryside B&B',
    description:
      'Intimate bed & breakfast surrounded by vineyards and rolling hills. Includes homemade breakfast.',
    imageUrl: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&h=600&fit=crop',
    location: {
      address: '987 Vineyard Lane',
      city: 'Wachau Valley',
      country: 'Austria',
    },
    price: {
      amount: 75,
      currency: 'EUR',
      period: 'night',
    },
    amenities: ['WiFi', 'Breakfast Included', 'Vineyard View', 'Romantic', 'Wine Tasting'],
    rating: 4.7,
    availableFrom: new Date('2024-04-01'),
    availableTo: new Date('2024-10-31'),
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
  },
];
