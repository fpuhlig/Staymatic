import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '../lib/auth-client';

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

  const createPayload = () => ({
    hostId,
    title: formData.title,
    description: formData.description,
    imageUrl: formData.imageUrl,
    images: formData.images
      .split(',')
      .map(url => url.trim())
      .filter(url => url),
    location: {
      address: formData.address,
      city: formData.city,
      country: formData.country,
    },
    price: {
      amount: parseFloat(formData.amount),
      currency: formData.currency,
      period: formData.period,
    },
    amenities: formData.amenities
      .split(',')
      .map(a => a.trim())
      .filter(a => a),
    availableFrom: formData.availableFrom,
    availableTo: formData.availableTo,
  });

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
