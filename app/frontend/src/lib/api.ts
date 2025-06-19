import { APP_CONSTANTS } from '../../../shared/src/constants';
import {
  Property,
  PropertyWithHost,
  PropertiesResponse,
  PropertiesWithHostsResponse,
} from '../../../shared/src/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || APP_CONSTANTS.DEFAULT_BACKEND_URL;

// Generic API fetch function with error handling
async function apiRequest<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies for auth
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}

// Property API functions
export const propertyAPI = {
  // Get all properties (without host data)
  async getProperties(): Promise<Property[]> {
    const response = await apiRequest<PropertiesResponse>('/api/properties');
    return response.data || [];
  },

  // Get all properties with host information
  async getPropertiesWithHosts(): Promise<PropertyWithHost[]> {
    const response = await apiRequest<PropertiesWithHostsResponse>('/api/properties/with-hosts');
    return response.data || [];
  },

  // Get properties with optional filters
  async getPropertiesFiltered(filters: {
    hostId?: string;
    city?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<PropertyWithHost[]> {
    const params = new URLSearchParams();

    if (filters.hostId) params.append('hostId', filters.hostId);
    if (filters.city) params.append('city', filters.city);
    if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());

    const queryString = params.toString();
    const endpoint = `/api/properties/with-hosts${queryString ? `?${queryString}` : ''}`;

    const response = await apiRequest<PropertiesWithHostsResponse>(endpoint);
    return response.data || [];
  },

  // Get single property by ID
  async getPropertyById(id: string): Promise<Property> {
    const response = await apiRequest<{ success: boolean; data: Property }>(
      `/api/properties/${id}`,
    );
    return response.data;
  },

  // Get single property with host by ID
  async getPropertyWithHostById(id: string): Promise<PropertyWithHost> {
    const response = await apiRequest<{ success: boolean; data: PropertyWithHost }>(
      `/api/properties/${id}/with-host`,
    );
    return response.data;
  },
};

// Error handling utility
export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = 'APIError';
  }
}
