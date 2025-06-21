'use client';

import { AuthGuard, PageLayout } from '../../../components';
import { FormContainer, FormActions, PropertyFormFields } from '../../../components/forms';
import { usePropertyForm } from '../../../hooks';

export default function AddProperty() {
  const { formData, isSubmitting, error, handleInputChange, createProperty } = usePropertyForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createProperty();
  };

  return (
    <AuthGuard
      requireAuth={true}
      unauthorizedTitle="Please log in to add a property"
      unauthorizedDescription="You need to be logged in to list properties on Staymatic."
    >
      <PageLayout
        title="Add New Property"
        description="Fill in the details to list your property on Staymatic"
        maxWidth="content"
        backLink={{
          href: '/host/dashboard',
          label: 'Back to Dashboard',
        }}
      >
        <FormContainer onSubmit={handleSubmit} error={error}>
          <PropertyFormFields formData={formData} onChange={handleInputChange} />
          <FormActions
            submitLabel="Create Property"
            submitLoadingLabel="Creating..."
            isSubmitting={isSubmitting}
            cancelHref="/host/dashboard"
          />
        </FormContainer>
      </PageLayout>
    </AuthGuard>
  );
}
