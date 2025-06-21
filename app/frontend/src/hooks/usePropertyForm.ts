import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '../lib/auth-client';
import { propertyFormSchema } from '../../../shared/src/schemas/property';

// Frontend form data interface (before validation)
export interface PropertyFormData {
  title: string;
  description: string;
  imageUrl: string;
  images: string; // Comma-separated additional images
  address: string;
  city: string;
  country: string;
  amount: string;
  currency: string;
  period: string;
  amenities: string;
  availableFrom: string;
  availableTo: string;
}

const initialFormData: PropertyFormData = {
  title: '',
  description: '',
  imageUrl: '',
  images: '',
  address: '',
  city: '',
  country: 'Germany',
  amount: '',
  currency: 'EUR',
  period: 'night',
  amenities: '',
  availableFrom: '',
  availableTo: '',
};

interface UsePropertyFormProps {
  initialData?: Partial<PropertyFormData>;
  onSuccess?: () => void;
}

export const usePropertyForm = ({ initialData, onSuccess }: UsePropertyFormProps = {}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [formData, setFormData] = useState<PropertyFormData>({
    ...initialFormData,
    ...initialData,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hostId = session?.user?.id || '';

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const createPayload = () => {
    // First, transform form data to match Zod schema expectations
    const transformedData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      imageUrl: formData.imageUrl.trim(),
      images: formData.images.trim(), // Keep as string for frontend schema
      location: {
        address: formData.address.trim(),
        city: formData.city.trim(),
        country: formData.country.trim(),
      },
      price: {
        amount: parseFloat(formData.amount) || 0, // Convert string to number
        currency: formData.currency as 'EUR' | 'USD' | 'GBP',
        period: formData.period as 'night' | 'week' | 'month',
      },
      amenities: formData.amenities
        ? formData.amenities
            .split(',')
            .map(a => a.trim())
            .filter(a => a)
        : [],
      availableFrom: formData.availableFrom,
      availableTo: formData.availableTo,
    };

    // Validate with Zod schema
    const validationResult = propertyFormSchema.safeParse(transformedData);

    if (!validationResult.success) {
      // Get the first validation error with detailed path information
      const errors = validationResult.error.errors;
      const errorMessages = errors.map(err => {
        const path = err.path.length > 0 ? `${err.path.join('.')}: ` : '';
        return `${path}${err.message}`;
      });
      throw new Error(`Validation failed: ${errorMessages.join(', ')}`);
    }

    // Return validated data for backend API
    const validatedData = validationResult.data;

    return {
      hostId,
      title: validatedData.title,
      description: validatedData.description,
      imageUrl: validatedData.imageUrl,
      images: validatedData.images
        ? validatedData.images
            .split(',')
            .map(url => url.trim())
            .filter(url => url)
        : [],
      location: validatedData.location,
      price: validatedData.price,
      amenities: validatedData.amenities,
      availableFrom: validatedData.availableFrom,
      availableTo: validatedData.availableTo,
    };
  };

  const submitForm = async (url: string, method: 'POST' | 'PUT' = 'POST') => {
    setIsSubmitting(true);
    setError(null);

    if (!hostId) {
      setError('You must be logged in to manage properties');
      setIsSubmitting(false);
      return false;
    }

    try {
      const payload = createPayload();
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `Failed to ${method === 'POST' ? 'create' : 'update'} property`,
        );
      }

      // Success
      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/host/dashboard');
      }
      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : `Failed to ${method === 'POST' ? 'create' : 'update'} property`;
      setError(errorMessage);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const createProperty = () => submitForm('http://localhost:3001/api/properties', 'POST');
  const updateProperty = (id: string) =>
    submitForm(`http://localhost:3001/api/properties/${id}`, 'PUT');

  return {
    formData,
    isSubmitting,
    error,
    handleInputChange,
    createProperty,
    updateProperty,
    setFormData,
    setError,
  };
};
