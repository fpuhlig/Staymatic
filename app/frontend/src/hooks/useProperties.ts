'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Property, PropertyWithHost } from '../../../shared/src/types';
import { propertyAPI } from '../lib/api';

interface UsePropertiesOptions {
  autoLoad?: boolean;
  includeHosts?: boolean;
  filters?: {
    hostId?: string;
    city?: string;
    minPrice?: number;
    maxPrice?: number;
  };
}

interface UsePropertiesReturn {
  properties: Property[] | PropertyWithHost[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  clearError: () => void;
}

export const useProperties = (options: UsePropertiesOptions = {}): UsePropertiesReturn => {
  const { autoLoad = true, includeHosts = false, filters } = options;

  const [properties, setProperties] = useState<Property[] | PropertyWithHost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Memoize filters to prevent infinite re-renders
  const stableFilters = useMemo(() => {
    if (!filters) return null;
    return JSON.stringify(filters);
  }, [filters]);

  const fetchProperties = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      let data: Property[] | PropertyWithHost[];

      const parsedFilters = stableFilters ? JSON.parse(stableFilters) : null;

      if (includeHosts && parsedFilters && Object.keys(parsedFilters).length > 0) {
        // Filtered properties with hosts
        data = await propertyAPI.getPropertiesFiltered(parsedFilters);
      } else if (includeHosts) {
        // All properties with hosts
        data = await propertyAPI.getPropertiesWithHosts();
      } else {
        // Basic properties without hosts
        data = await propertyAPI.getProperties();
      }

      setProperties(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch properties';
      setError(errorMessage);
      console.error('Error fetching properties:', err);
    } finally {
      setIsLoading(false);
    }
  }, [includeHosts, stableFilters]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Auto-load properties on mount or when dependencies change
  useEffect(() => {
    if (autoLoad) {
      fetchProperties();
    }
  }, [autoLoad, fetchProperties]);

  return {
    properties,
    isLoading,
    error,
    refetch: fetchProperties,
    clearError,
  };
};
