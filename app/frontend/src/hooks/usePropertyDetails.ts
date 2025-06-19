import { useState, useEffect, useCallback } from 'react';
import { PropertyWithHost } from '../../../shared/src/types';
import { propertyAPI } from '../lib/api';

interface UsePropertyDetailsOptions {
  propertyId: string;
  autoLoad?: boolean;
}

interface UsePropertyDetailsReturn {
  property: PropertyWithHost | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  clearError: () => void;
}

export const usePropertyDetails = ({
  propertyId,
  autoLoad = true,
}: UsePropertyDetailsOptions): UsePropertyDetailsReturn => {
  const [property, setProperty] = useState<PropertyWithHost | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProperty = useCallback(async () => {
    if (!propertyId) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await propertyAPI.getPropertyWithHostById(propertyId);
      setProperty(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch property details';
      setError(errorMessage);
      console.error('Error fetching property details:', err);
    } finally {
      setIsLoading(false);
    }
  }, [propertyId]);

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    if (autoLoad && propertyId) {
      fetchProperty();
    }
  }, [autoLoad, propertyId, fetchProperty]);

  return {
    property,
    isLoading,
    error,
    refetch: fetchProperty,
    clearError,
  };
};
