'use client';

import { useParams } from 'next/navigation';
import { PageLayout, LoadingSpinner, ErrorMessage } from '../../../components';
import {
  PropertyHeader,
  PropertyInfo,
  HostInfo,
  BookingCard,
} from '../../../components/PropertyDetails';
import { usePropertyDetails } from '../../../hooks/usePropertyDetails';

export default function PropertyDetails() {
  const params = useParams();
  const propertyId = params.id as string;

  const { property, isLoading, error, refetch } = usePropertyDetails({
    propertyId,
    autoLoad: true,
  });

  if (isLoading) {
    return (
      <PageLayout
        title="Loading Property..."
        backLink={{
          href: '/',
          label: 'Back to Properties',
        }}
      >
        <div className="flex justify-center py-20">
          <LoadingSpinner message="Loading property details..." />
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout
        title="Error Loading Property"
        backLink={{
          href: '/',
          label: 'Back to Properties',
        }}
      >
        <div className="flex justify-center py-20">
          <ErrorMessage message={error} onRetry={refetch} />
        </div>
      </PageLayout>
    );
  }

  if (!property) {
    return (
      <PageLayout
        title="Property Not Found"
        backLink={{
          href: '/',
          label: 'Back to Properties',
        }}
      >
        <div className="flex justify-center py-20">
          <div className="text-center">
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Property not found
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              The property you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={property.title}
      backLink={{
        href: '/',
        label: 'Back to Properties',
      }}
      hideTitle={true} // We'll show the title in PropertyHeader instead
      maxWidth="7xl" // Use full width for property details
    >
      <div>
        {/* Property Header */}
        <PropertyHeader property={property} />

        {/* Main Content Grid */}
        <div className="grid gap-8 xl:grid-cols-3 xl:gap-12">
          {/* Left Column - Property Info */}
          <div className="xl:col-span-2">
            <PropertyInfo property={property} />
          </div>

          {/* Right Column - Booking Card */}
          <div className="xl:col-span-1">
            <BookingCard property={property} />
          </div>
        </div>

        {/* Host Information - Full Width */}
        <div className="mt-12">
          <HostInfo host={property.host} />
        </div>
      </div>
    </PageLayout>
  );
}
