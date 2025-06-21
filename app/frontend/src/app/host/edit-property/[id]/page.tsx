'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { AuthGuard, PageLayout, LoadingSpinner, ErrorMessage } from '../../../../components';
import { FormContainer, FormActions, PropertyFormFields } from '../../../../components/forms';
import { usePropertyForm, PropertyFormData } from '../../../../hooks';
import { Property } from '../../../../../../shared/src/types';

export default function EditProperty() {
  const params = useParams();
  const propertyId = params.id as string;
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const {
    formData,
    isSubmitting,
    error,
    handleInputChange,
    updateProperty,
    setFormData,
    setError,
  } = usePropertyForm();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/properties/${propertyId}`, {
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch property');
        }

        const apiResponse = await response.json();
        const property: Property = apiResponse.data || apiResponse;

        // Transform property data to form data
        const initialData: PropertyFormData = {
          title: property.title,
          description: property.description,
          imageUrl: property.imageUrl,
          address: property.location.address,
          city: property.location.city,
          country: property.location.country,
          amount: property.price.amount.toString(),
          currency: property.price.currency,
          period: property.price.period,
          amenities: property.amenities.join(', '),
          availableFrom: new Date(property.availableFrom).toISOString().split('T')[0],
          availableTo: new Date(property.availableTo).toISOString().split('T')[0],
          images: property.images ? property.images.join(', ') : '',
        };

        setFormData(initialData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load property';
        setLoadError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    if (propertyId) {
      fetchProperty();
    }
  }, [propertyId, setFormData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProperty(propertyId);
  };

  const handleRetry = () => {
    setLoadError(null);
    setError(null);
    setIsLoading(true);
    // Re-trigger the useEffect by updating a dependency
    window.location.reload();
  };

  return (
    <AuthGuard>
      <PageLayout
        title="Edit Property"
        description="Update your property details"
        maxWidth="3xl"
        backLink={{
          href: '/host/dashboard',
          label: 'Back to Dashboard',
        }}
      >
        {isLoading ? (
          <LoadingSpinner message="Loading property..." />
        ) : loadError ? (
          <ErrorMessage message={loadError} onRetry={handleRetry} retryLabel="Try Again" />
        ) : (
          <FormContainer onSubmit={handleSubmit} error={error}>
            <PropertyFormFields formData={formData} onChange={handleInputChange} />
            <FormActions
              submitLabel="Update Property"
              submitLoadingLabel="Updating..."
              isSubmitting={isSubmitting}
              cancelHref="/host/dashboard"
            />
          </FormContainer>
        )}
      </PageLayout>
    </AuthGuard>
  );
}
